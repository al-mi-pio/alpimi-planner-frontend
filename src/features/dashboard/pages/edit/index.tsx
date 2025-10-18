import { useQuery } from '@tanstack/react-query';
import { type ReactNode, use, useEffect, useState } from 'react';
import { Mosaic } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { useLoaderData } from 'react-router-dom';

import { collisionGetAll } from '@/api/services/collisionService';
import { dayOffGetAll } from '@/api/services/dayOffService';
import { lessonBlockGetAll } from '@/api/services/lessonBlockService';
import { lessonPeriodGetAll } from '@/api/services/lessonPeriodService';
import { scheduleGetByName } from '@/api/services/scheduleService';
import { scheduleSettingsGet } from '@/api/services/scheduleSettingsService';
import { UserContext } from '@/features/auth/contexts';
import { CollisionsTable } from '@/features/dashboard/components/CollisionsTable';
import { Timetable } from '@/features/dashboard/components/Timetable';
import { CurrentTimetableFiltersContext } from '@/features/dashboard/contexts';
import { PropertiesWindowProvider } from '@/features/dashboard/providers/PropertiesWindow';
import { EditPageStyle } from '@/features/dashboard/styles/EditPage.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import type { CurrentTimetableFilters } from '@/features/dashboard/types';
import { parseTimetableLessonBlocks } from '@/features/dashboard/utils';
import { schoolDaysFromDTO } from '@/features/schedules/utils';
import { addDaysToDate, getFirstDayOfWeek } from '@/shared/utils/date';

const EditPage = () => {
    const [currentTimetableFilters, setCurrentTimetableFilters] =
        useState<CurrentTimetableFilters | null>(null);
    const { customURL } = use(UserContext);
    const { scheduleName } = useLoaderData();

    const { data: schedule, isLoading: isScheduleLoading } = useQuery({
        queryKey: ['schedule', customURL, scheduleName],
        queryFn: () => scheduleGetByName(customURL, scheduleName),
        select: (data) => data.content,
        enabled: !!customURL,
    });

    const { data: scheduleSettings, isLoading: isScheduleSettingsLoading } =
        useQuery({
            queryKey: ['scheduleSettings'],
            queryFn: () =>
                scheduleSettingsGet(schedule ? schedule.id : '0-0-0-0-0'),
            select: (data) => ({
                ...data.content,
                schoolDays: schoolDaysFromDTO(data.content.schoolDays),
            }),
            enabled: !!schedule,
        });

    const { data: dayOffs, isLoading: isdayOffLoading } = useQuery({
        queryKey: ['dayOff'],
        queryFn: () =>
            dayOffGetAll({
                params: { scheduleId: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const { data: lessonPeriods, isLoading: isLessonPeriodLoading } = useQuery({
        queryKey: ['lessonPeriod'],
        queryFn: () =>
            lessonPeriodGetAll({
                params: { scheduleId: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const { data: collisions, isLoading: isCollisionLoading } = useQuery({
        queryKey: ['collision'],
        queryFn: () =>
            collisionGetAll({
                params: { id: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const { data: lessonBlocks, isLoading: isLessonBlockLoading } = useQuery({
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
        enabled: !!currentTimetableFilters,
    });

    const timetableLoading =
        isScheduleSettingsLoading ||
        isLessonBlockLoading ||
        isLessonPeriodLoading ||
        isCollisionLoading ||
        isScheduleLoading ||
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
        properties: <div>properties</div>,
        lessons: <div>lessons</div>,
        tree: <div>tree</div>,
        timetable: timetableLoading ? (
            <StyledLoading />
        ) : (
            scheduleSettings &&
            lessonBlocks &&
            lessonPeriods &&
            collisions &&
            dayOffs && (
                <Timetable
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
                        },
                        splitPercentage: 84,
                    }}
                />
            </CurrentTimetableFiltersContext.Provider>
        </PropertiesWindowProvider>
    );
};

export default EditPage;
