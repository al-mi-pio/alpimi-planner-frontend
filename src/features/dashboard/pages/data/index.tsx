import { useQuery } from '@tanstack/react-query';
import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mosaic } from 'react-mosaic-component';
import { useNavigate, useSearchParams } from 'react-router';

import { scheduleSettingsGet } from '@/api/services/scheduleSettingsService';
import { DataEntityType } from '@/api/types';
import { ImportWindow } from '@/features/dashboard/components/ImportWindow';
import { useSchedulePeriods } from '@/features/dashboard/hooks/useSchedulePeriods';
import { DataTree } from '@/features/dashboard/styles/DataPage.style';
import { EditPageStyle } from '@/features/dashboard/styles/EditPage.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import { TreeItem } from '@/shared/components/Tree';
import { initialScheduleSetup } from '@/shared/constants/routes';
import Book from '@/shared/icons/Book';

const DataPage = () => {
    const { t } = useTranslation('dashboard');
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [selectedEntity, setSelectedEntity] = useState('import');
    const { schedule, lessonPeriods, isSchedulePeriodLoading } =
        useSchedulePeriods();

    const { data: scheduleSettings, isLoading: isScheduleSettingsLoading } =
        useQuery({
            queryKey: ['scheduleSettings', schedule?.id],
            queryFn: () =>
                scheduleSettingsGet(schedule ? schedule.id : '0-0-0-0-0'),
            select: (data) => data.content,
            enabled: !!lessonPeriods,
        });

    useEffect(() => {
        if (schedule && lessonPeriods && !lessonPeriods.length) {
            navigate(initialScheduleSetup(schedule.name));
        }
    }, [lessonPeriods]);

    if (isSchedulePeriodLoading || isScheduleSettingsLoading)
        return <StyledLoading />;
    if (
        !lessonPeriods ||
        !scheduleSettings ||
        !schedule ||
        !lessonPeriods.length
    )
        return null;

    const LOCALES_MAP = {
        import: t('Data import export'),
        availability: t('Availability'),
        classroom: t('Classrooms'),
        classroomType: t('Classroom types'),
        collisionType: t('Collision types'),
        dayOff: t('Days off'),
        group: t('Groups'),
        lessonPeriod: t('Lesson periods'),
        lesson: t('Lessons'),
        lessonType: t('Lesson types'),
        student: t('Students'),
        subgroup: t('Subgroups'),
        teacher: t('Teachers'),
    };

    const windows: { [viewId: string]: ReactNode } = {
        entities: (
            <DataTree tabIndex={0}>
                <TreeItem
                    key="import"
                    icon={<Book />}
                    label={LOCALES_MAP.import}
                    isSelected={selectedEntity === 'import'}
                    onSelected={() => setSelectedEntity('import')}
                    value="import"
                />

                {Object.values(DataEntityType).map((entityType) => (
                    <TreeItem
                        key={entityType}
                        icon={<Book />}
                        label={LOCALES_MAP[entityType]}
                        isSelected={selectedEntity === entityType}
                        onSelected={(entityType) =>
                            entityType && setSelectedEntity(entityType)
                        }
                        value={entityType}
                    />
                ))}
            </DataTree>
        ),
        data: (
            <ImportWindow
                renderMultiStep={params.get('firstTime') === 'true'}
                schedule={schedule}
            />
        ),
    };

    return (
        <>
            <EditPageStyle />
            <Mosaic<string>
                resize={{ minimumPaneSizePercentage: 16 }}
                renderTile={(id) => windows[id]}
                initialValue={{
                    direction: 'row',
                    first: 'entities',
                    second: 'data',
                    splitPercentage: 16,
                }}
            />
        </>
    );
};

export default DataPage;
