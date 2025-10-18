import { use } from 'react';
import { useTranslation } from 'react-i18next';

import { EntityType } from '@/api/types';
import type { Lesson } from '@/api/types/LessonService';
import { CurrentTimetableFiltersContext } from '@/features/dashboard/contexts';
import { usePropertiesWindow } from '@/features/dashboard/hooks/usePropertiesWindow';
import { StyledLessonTile } from '@/features/dashboard/styles/LessonTile.style';
import { getLessonTileStatus } from '@/features/dashboard/utils';
import P from '@/shared/components/P';

export const LessonTile = ({
    id,
    name,
    currentHours,
    amountOfHours,
}: Lesson) => {
    const { t } = useTranslation('dashboard');
    const [, setCurrentTimetableFilters] = use(CurrentTimetableFiltersContext);
    const { setSelectedEntity } = usePropertiesWindow();

    return (
        <StyledLessonTile
            $status={getLessonTileStatus(currentHours, amountOfHours)}
            onClick={() =>
                setSelectedEntity({
                    id,
                    entity: EntityType.Lesson,
                })
            }
            onDoubleClick={() =>
                setCurrentTimetableFilters(
                    (prev) =>
                        prev && {
                            ...prev,
                            entityName: name,
                            entityId: id,
                        }
                )
            }
        >
            <P secondary>{name}</P>
            <P secondary>
                {t('{{currentHours}}/{{amountOfHours}} School hours', {
                    currentHours,
                    amountOfHours,
                })}
            </P>
        </StyledLessonTile>
    );
};
