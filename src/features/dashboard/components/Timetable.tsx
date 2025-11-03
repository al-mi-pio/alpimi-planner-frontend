import { type ComponentPropsWithRef, use, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { DayOff } from '@/api/types/DayOffService';
import type { LessonPeriod } from '@/api/types/LessonPeriodService';
import type { ScheduleSettings } from '@/api/types/ScheduleSettingsService';
import type { LessonBlockProps } from '@/features/dashboard/components/LessonBlock';
import { LessonBlockDropModal } from '@/features/dashboard/components/LessonBlockDropModal';
import { TimetableCell } from '@/features/dashboard/components/TimetableCell';
import {
    HoveredBlockIdContext,
    CurrentTimetableFiltersContext,
    OpenFoldersContext,
} from '@/features/dashboard/contexts';
import {
    Navigation,
    Scrollable,
    Table,
    Wrapper,
    TimetableRow,
    HeaderCellLeft,
    HeaderCellTop,
} from '@/features/dashboard/styles/Timetable.style';
import type { DroppedLesson } from '@/features/dashboard/types';
import { weekDaysFromSchoolDays } from '@/features/dashboard/utils';
import Button from '@/shared/components/Button';
import H from '@/shared/components/H';
import P from '@/shared/components/P';
import { weekDays as allWeekDays } from '@/shared/constants/time';
import LeftArrow from '@/shared/icons/LeftArrow';
import RightArrow from '@/shared/icons/RightArrow';
import {
    addDaysToDate,
    addMinutesToTime,
    getFirstDayOfWeek,
    isBetweenDates,
} from '@/shared/utils/date';
import { capitalize } from '@/shared/utils/string';

export interface TimetableProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    lessonPeriods: LessonPeriod[];
    scheduleSettings: ScheduleSettings;
    lessonBlocks: LessonBlocks;
    dayOffs: DayOff[];
}

export type LessonBlocks = Record<string, LessonBlockProps[]>;

/**
 * Timetable component
 */
export const Timetable = ({
    lessonPeriods,
    scheduleSettings,
    lessonBlocks,
    dayOffs,
}: TimetableProps) => {
    const { t } = useTranslation('schedules');
    const weekDays = weekDaysFromSchoolDays(scheduleSettings.schoolDays);
    const openFoldersState = useState(
        Object.fromEntries(
            weekDays.map((weekDay) => [allWeekDays.indexOf(weekDay), false])
        )
    );
    const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
    const [droppedLesson, setDroppedLesson] = useState<DroppedLesson>();
    const [currentTimetableFilters, setCurrentTimetableFilters] = use(
        CurrentTimetableFiltersContext
    );

    const moveTimetableWeek = (weeks: number) =>
        setCurrentTimetableFilters(
            (prev) =>
                prev && {
                    ...prev,
                    fromDate: addDaysToDate(prev.fromDate, weeks * 7),
                    toDate: addDaysToDate(prev.toDate, weeks * 7),
                }
        );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const parentFolder = (e.target as HTMLElement).closest(
                '.lesson-block-folder'
            );

            if (!parentFolder || e.type === 'dragover') {
                openFoldersState[1]((prev) =>
                    Object.fromEntries(
                        Object.keys(prev).map((key) => [key, false])
                    )
                );
            }
        };

        const hoverHandler = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('[id]');
            setHoveredBlockId(target ? target.id : null);
        };

        document.addEventListener('click', handler);
        document.addEventListener('dragover', handler);
        document.addEventListener('mouseover', hoverHandler);

        return () => {
            document.removeEventListener('click', handler);
            document.removeEventListener('dragover', handler);
            document.removeEventListener('mouseover', hoverHandler);
        };
    }, []);

    return (
        <Wrapper>
            <Navigation>
                {currentTimetableFilters && (
                    <>
                        <Button
                            icon={<LeftArrow />}
                            disabled={
                                getFirstDayOfWeek(
                                    scheduleSettings.schoolYearStart
                                ) === currentTimetableFilters.fromDate
                            }
                            onClick={() => moveTimetableWeek(-1)}
                        />
                        <div>
                            <H level={3}>
                                {currentTimetableFilters.entityName}
                            </H>
                            <P
                                bold={false}
                            >{`${(isBetweenDates(currentTimetableFilters.fromDate, currentTimetableFilters.fromDate, scheduleSettings.schoolYearStart) ? scheduleSettings.schoolYearStart : currentTimetableFilters.fromDate).replaceAll('-', '.')} - ${(isBetweenDates(currentTimetableFilters.toDate, scheduleSettings.schoolYearEnd, currentTimetableFilters.toDate) ? scheduleSettings.schoolYearEnd : currentTimetableFilters.toDate).replaceAll('-', '.')}`}</P>
                        </div>
                        <Button
                            icon={<RightArrow />}
                            disabled={
                                addDaysToDate(
                                    getFirstDayOfWeek(
                                        scheduleSettings.schoolYearEnd
                                    ),
                                    6
                                ) === currentTimetableFilters.toDate
                            }
                            onClick={() => moveTimetableWeek(1)}
                        />
                    </>
                )}
            </Navigation>

            <Scrollable>
                <Table>
                    <OpenFoldersContext.Provider value={openFoldersState}>
                        <HoveredBlockIdContext value={hoveredBlockId}>
                            <TimetableRow>
                                <div style={{ flex: 1 }} />

                                {currentTimetableFilters &&
                                    weekDays.map((weekDay) => {
                                        if (
                                            !isBetweenDates(
                                                addDaysToDate(
                                                    currentTimetableFilters.fromDate,
                                                    allWeekDays.indexOf(weekDay)
                                                ),
                                                scheduleSettings.schoolYearStart,
                                                scheduleSettings.schoolYearEnd
                                            )
                                        )
                                            return null;

                                        const dayOffName = dayOffs.find(
                                            (dayOff) =>
                                                isBetweenDates(
                                                    addDaysToDate(
                                                        currentTimetableFilters.fromDate,
                                                        allWeekDays.indexOf(
                                                            weekDay
                                                        )
                                                    ),
                                                    dayOff.from,
                                                    dayOff.to
                                                )
                                        )?.name;

                                        return (
                                            <HeaderCellTop
                                                key={weekDay}
                                                $disabled={!!dayOffName}
                                            >
                                                {dayOffName ||
                                                    t(capitalize(weekDay))}
                                                <br />
                                                {addDaysToDate(
                                                    currentTimetableFilters.fromDate,
                                                    allWeekDays.indexOf(weekDay)
                                                ).replaceAll('-', '.')}
                                            </HeaderCellTop>
                                        );
                                    })}
                            </TimetableRow>

                            {currentTimetableFilters &&
                                lessonPeriods.map(({ id, start }, i) => (
                                    <TimetableRow key={id}>
                                        <HeaderCellLeft>{`${start.slice(0, 5)} - ${addMinutesToTime(start, scheduleSettings.schoolHour)}`}</HeaderCellLeft>
                                        {weekDays.map((weekDay) =>
                                            isBetweenDates(
                                                addDaysToDate(
                                                    currentTimetableFilters.fromDate,
                                                    allWeekDays.indexOf(weekDay)
                                                ),
                                                scheduleSettings.schoolYearStart,
                                                scheduleSettings.schoolYearEnd
                                            ) ? (
                                                <TimetableCell
                                                    key={weekDay}
                                                    disabled={
                                                        dayOffs.find((dayOff) =>
                                                            isBetweenDates(
                                                                addDaysToDate(
                                                                    currentTimetableFilters.fromDate,
                                                                    allWeekDays.indexOf(
                                                                        weekDay
                                                                    )
                                                                ),
                                                                dayOff.from,
                                                                dayOff.to
                                                            )
                                                        )?.name
                                                    }
                                                    id={`${i}-${allWeekDays.indexOf(weekDay)}-cell`}
                                                    setDroppedLesson={
                                                        setDroppedLesson
                                                    }
                                                    lessonBlockProps={
                                                        lessonBlocks[
                                                            `${i}-${allWeekDays.indexOf(weekDay)}-cell`
                                                        ] || []
                                                    }
                                                />
                                            ) : null
                                        )}
                                    </TimetableRow>
                                ))}
                        </HoveredBlockIdContext>
                    </OpenFoldersContext.Provider>
                </Table>
            </Scrollable>
            <LessonBlockDropModal
                initialDataState={[droppedLesson, setDroppedLesson]}
            />
        </Wrapper>
    );
};
