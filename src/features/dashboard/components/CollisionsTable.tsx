import { useTranslation } from 'react-i18next';

import { EntityType } from '@/api/types';
import type { Collision } from '@/api/types/CollisionService';
import { usePropertiesWindow } from '@/features/dashboard/hooks/usePropertiesWindow';
import {
    ErrorsCount,
    NoCollisionsWrapper,
    TableWrapper,
} from '@/features/dashboard/styles/CollisionsTable.style';
import P from '@/shared/components/P';
import Table from '@/shared/components/Table';
import type { TableColumn } from '@/shared/components/Table/types';
import ErrorSign from '@/shared/icons/ErrorSign';
import WarningSign from '@/shared/icons/WarningSign';
import { warningIconRenderFn } from '@/shared/utils/table';

export interface CollisionsTableProps {
    collisions: Collision[];
}

export const CollisionsTable = ({ collisions }: CollisionsTableProps) => {
    const { t } = useTranslation('dashboard');
    const { selectedEntity, setSelectedEntity } = usePropertiesWindow();
    const errors = collisions.filter(
        (collision) => collision.collisionType.weight >= 1
    ).length;
    const warnings = collisions.length - errors;

    const columns: TableColumn[] = [
        { label: '', key: 'icon', renderFn: warningIconRenderFn },
        { label: t('Name'), key: 'name' },
        { label: t('Description'), key: 'description' },
        { label: t('Cause'), key: 'cause' },
        { label: t('Weight'), key: 'weight' },
    ];

    const collisionsToData = collisions.map((collision) => ({
        icon: collision.collisionType.weight,
        name: collision.collisionType.name,
        description: collision.collisionType.description,
        //TODO: implement 'cause' field when data from backend is enough
        cause: '',
        weight: collision.collisionType.weight,
    }));

    if (!collisions.length) {
        return (
            <NoCollisionsWrapper>
                <P>{t('No collisions')}</P>
            </NoCollisionsWrapper>
        );
    }

    return (
        <TableWrapper>
            <ErrorsCount>
                <P>
                    <ErrorSign />
                    {t('{{count}} Error', { count: errors })}
                </P>
                <P>
                    <WarningSign />
                    {t('{{count}} Warning', { count: warnings })}
                </P>
            </ErrorsCount>
            <Table
                columns={columns}
                data={collisionsToData}
                selectedItem={selectedEntity?.id ?? undefined}
                onSelectItem={(value) =>
                    setSelectedEntity({
                        entity: EntityType.Collision,
                        id: value ?? '0-0-0-0-0',
                    })
                }
            />
        </TableWrapper>
    );
};
