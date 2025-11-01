import { useQuery } from '@tanstack/react-query';
import { type ReactNode, useEffect } from 'react';
import { Mosaic } from 'react-mosaic-component';
import { useNavigate, useSearchParams } from 'react-router';

import { scheduleSettingsGet } from '@/api/services/scheduleSettingsService';
import { useSchedulePeriods } from '@/features/dashboard/hooks/useSchedulePeriods';
import { EditPageStyle } from '@/features/dashboard/styles/EditPage.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import { CreateScheduleMultiStep } from '@/features/schedules/components/CreateScheduleMultiStep';
import { initialScheduleSetup } from '@/shared/constants/routes';

const DataPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
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

    const windows: { [viewId: string]: ReactNode } = {
        entities: <>{'test'}</>,
        data: (
            <>
                {params.get('firstTime') === 'true' && (
                    <CreateScheduleMultiStep currentStep={2} />
                )}
                {'test2'}
            </>
        ),
    };

    return (
        <>
            <EditPageStyle />
            <Mosaic<string>
                renderTile={(id) => windows[id]}
                initialValue={{
                    direction: 'row',
                    first: 'entities',
                    second: 'data',
                    splitPercentage: 20,
                }}
            />
        </>
    );
};

export default DataPage;
