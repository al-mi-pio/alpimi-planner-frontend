import { type ReactNode, useEffect, useState } from 'react';
import { Mosaic } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { useNavigate } from 'react-router';

import { collisionGetAll } from '@/api/services/collisionService';
import { dayOffGetAll } from '@/api/services/dayOffService';
import { lessonBlockGetAll } from '@/api/services/lessonBlockService';
import { lessonGetAll } from '@/api/services/lessonService';
import { scheduleSettingsGet } from '@/api/services/scheduleSettingsService';
import { CollisionsTable } from '@/features/dashboard/components/CollisionsTable';
import { Explorer } from '@/features/dashboard/components/Explorer';
import { Lessons } from '@/features/dashboard/components/Lessons';
import { Properties } from '@/features/dashboard/components/Properties';
import { Timetable } from '@/features/dashboard/components/Timetable';
import { CurrentTimetableFiltersContext } from '@/features/dashboard/contexts';
import { useSchedulePeriods } from '@/features/dashboard/hooks/useSchedulePeriods';
import { PropertiesWindowProvider } from '@/features/dashboard/providers/PropertiesWindow';
import { EditPageStyle } from '@/features/dashboard/styles/EditPage.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import type { CurrentTimetableFilters } from '@/features/dashboard/types';
import { parseTimetableLessonBlocks } from '@/features/dashboard/utils';
import { schoolDaysFromDTO } from '@/features/schedules/utils';
import { initialScheduleSetup } from '@/shared/constants/routes';
import { useGetData } from '@/shared/hooks/useGetData';
import { addDaysToDate, getFirstDayOfWeek } from '@/shared/utils/date';

const EditPage = () => {
    const [currentTimetableFilters, setCurrentTimetableFilters] =
        useState<CurrentTimetableFilters | null>(null);
    const navigate = useNavigate();

    const { schedule, lessonPeriods, isSchedulePeriodLoading } =
        useSchedulePeriods();

    const { data: scheduleSettings, isLoading: isScheduleSettingsLoading } =
        useGetData({
            queryKey: ['scheduleSettings', schedule?.id],
            queryFn: () =>
                scheduleSettingsGet(schedule ? schedule.id : '0-0-0-0-0'),
            select: (data) => ({
                ...data.content,
                schoolDays: schoolDaysFromDTO(data.content.schoolDays),
            }),
            enabled: !!lessonPeriods && !!lessonPeriods.length,
        });

    const { data: dayOffs, isLoading: isdayOffLoading } = useGetData({
        queryKey: ['dayOff', schedule?.id],
        queryFn: () =>
            dayOffGetAll({
                params: { scheduleId: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!lessonPeriods && !!lessonPeriods.length,
    });

    const { data: collisions, isLoading: isCollisionLoading } = useGetData({
        queryKey: ['collision', schedule?.id],
        queryFn: () =>
            collisionGetAll({
                params: { id: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!lessonPeriods && !!lessonPeriods.length,
    });

    const { data: lessons, isLoading: isLessonLoading } = useGetData({
        queryKey: ['lesson', schedule?.id],
        queryFn: () =>
            lessonGetAll({
                params: { id: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!lessonPeriods && !!lessonPeriods.length,
    });

    const { data: lessonBlocks, isLoading: isLessonBlockLoading } = useGetData({
        queryKey: [
            'lessonBlock',
            currentTimetableFilters?.entityId,
            currentTimetableFilters?.fromDate,
        ],
        queryFn: () =>
            lessonBlockGetAll({
                params: {
                    id: currentTimetableFilters?.entityId,
                    fromDate: currentTimetableFilters?.fromDate,
                    toDate: currentTimetableFilters?.toDate,
                    sortBy: 'LessonDate',
                },
            }),
        select: (data) => data.content,
        enabled:
            !!currentTimetableFilters &&
            !!lessonPeriods &&
            !!lessonPeriods.length,
    });

    const timetableLoading =
        isSchedulePeriodLoading ||
        isScheduleSettingsLoading ||
        isLessonBlockLoading ||
        isCollisionLoading ||
        isdayOffLoading;

    useEffect(() => {
        if (scheduleSettings && schedule)
            setCurrentTimetableFilters({
                entityId: schedule.id,
                entityName: schedule.name,
                fromDate: getFirstDayOfWeek(scheduleSettings.schoolYearStart),
                toDate: addDaysToDate(
                    getFirstDayOfWeek(scheduleSettings.schoolYearStart),
                    6
                ),
            });
    }, [scheduleSettings]);

    const windows: { [viewId: string]: ReactNode } = {
        collisions: isCollisionLoading ? (
            <StyledLoading />
        ) : (
            collisions && <CollisionsTable collisions={collisions} />
        ),
        properties: isScheduleSettingsLoading ? (
            <StyledLoading />
        ) : (
            scheduleSettings && (
                <Properties
                    scheduleSettings={scheduleSettings}
                    scheduleId={schedule && schedule.id}
                />
            )
        ),
        lessons: isLessonLoading ? (
            <StyledLoading />
        ) : (
            lessons && <Lessons lessons={lessons} />
        ),
        tree: (
            <Explorer
                lessons={lessons}
                schedule={schedule}
                isLoading={isLessonLoading}
            />
        ),
        timetable: timetableLoading ? (
            <StyledLoading />
        ) : (
            scheduleSettings &&
            lessonBlocks &&
            lessonPeriods &&
            collisions &&
            dayOffs && (
                <Timetable
                    scheduleId={schedule && schedule.id}
                    lessonPeriods={lessonPeriods}
                    scheduleSettings={scheduleSettings}
                    dayOffs={dayOffs}
                    lessonBlocks={parseTimetableLessonBlocks(
                        lessonBlocks,
                        lessonPeriods,
                        collisions,
                        scheduleSettings.schoolDays
                    )}
                />
            )
        ),
    };

    useEffect(() => {
        if (schedule && lessonPeriods && !lessonPeriods.length) {
            navigate(initialScheduleSetup(schedule.name));
        }
    }, [lessonPeriods]);

    if (isSchedulePeriodLoading) return <StyledLoading />;
    if (!lessonPeriods || !lessonPeriods.length) return null;

    return (
        <PropertiesWindowProvider>
            <CurrentTimetableFiltersContext.Provider
                value={[currentTimetableFilters, setCurrentTimetableFilters]}
            >
                <EditPageStyle />
                <Mosaic<string>
                    resize={{ minimumPaneSizePercentage: 16 }}
                    renderTile={(id) => windows[id]}
                    initialValue={{
                        direction: 'row',
                        first: {
                            direction: 'column',
                            first: {
                                direction: 'row',
                                first: 'tree',
                                second: 'timetable',
                                splitPercentage: 20,
                            },
                            second: 'collisions',
                            splitPercentage: 80,
                        },
                        second: {
                            direction: 'column',
                            first: 'properties',
                            second: 'lessons',
                            splitPercentage: 35,
                        },
                        splitPercentage: 84,
                    }}
                />
            </CurrentTimetableFiltersContext.Provider>
        </PropertiesWindowProvider>
    );
};

export default EditPage;
