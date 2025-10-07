import { type ComponentPropsWithRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { LessonPeriod } from '@/api/types/LessonPeriodService';
import type { LessonBlockProps } from '@/features/dashboard/components/LessonBlock';
import { TimetableCell } from '@/features/dashboard/components/TimetableCell';
import {
    HoveredBlockIdContext,
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
import { WeekDay, weekDays as allWeekDays } from '@/shared/constants/time';
import { addMinutesToTime } from '@/shared/utils/date';
import { capitalize } from '@/shared/utils/string';

export interface TimetableProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    weekDays: WeekDay[];
    lessonPeriods: LessonPeriod[];
    schoolHour: number;
    lessonBlocks: LessonBlocks;
}

export type LessonBlocks = Record<string, LessonBlockProps[]>;

/**
 * Timetable component
 */
export const Timetable = ({
    weekDays,
    lessonPeriods,
    schoolHour,
    lessonBlocks,
}: TimetableProps) => {
    const { t } = useTranslation('schedules');
    const openFoldersState = useState(
        Object.fromEntries(
            weekDays.map((weekDay) => [allWeekDays.indexOf(weekDay), false])
        )
    );
    const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);

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
            <Navigation></Navigation>

            <Scrollable>
                <Table>
                    <OpenFoldersContext.Provider value={openFoldersState}>
                        <HoveredBlockIdContext value={hoveredBlockId}>
                            <TimetableRow>
                                <div style={{ flex: 1 }} />

                                {weekDays.map((weekDay) => (
                                    <HeaderCellTop key={weekDay}>
                                        {t(capitalize(weekDay))}
                                    </HeaderCellTop>
                                ))}
                            </TimetableRow>

                            {lessonPeriods.map(({ id, start }, i) => (
                                <TimetableRow key={id}>
                                    <HeaderCellLeft>{`${start} - ${addMinutesToTime(start, schoolHour)}`}</HeaderCellLeft>
                                    {weekDays.map((weekDay) => (
                                        <TimetableCell
                                            key={weekDay}
                                            id={`${i}-${allWeekDays.indexOf(weekDay)}-cell`}
                                            lessonBlockProps={
                                                lessonBlocks[
                                                    `${i}-${allWeekDays.indexOf(weekDay)}-cell`
                                                ] || []
                                            }
                                        />
                                    ))}
                                </TimetableRow>
                            ))}
                        </HoveredBlockIdContext>
                    </OpenFoldersContext.Provider>
                </Table>
            </Scrollable>
        </Wrapper>
    );
};
