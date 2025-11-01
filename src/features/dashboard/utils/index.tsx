import type { Id } from '@/api/types';
import type { Collision } from '@/api/types/CollisionService';
import type { Group } from '@/api/types/GroupService';
import type { LessonBlock } from '@/api/types/LessonBlockService';
import type { LessonPeriod } from '@/api/types/LessonPeriodService';
import type { Lesson } from '@/api/types/LessonService';
import type { Subgroup } from '@/api/types/SubgroupService';
import type { LessonBlocks } from '@/features/dashboard/components/Timetable';
import {
    LessonTileStatus,
    Status,
    type Statuses,
} from '@/features/dashboard/types';
import { weekDays } from '@/shared/constants/time';
import ErrorSign from '@/shared/icons/ErrorSign';
import WarningSign from '@/shared/icons/WarningSign';
import { getAdjustedDay } from '@/shared/utils/date';

export const renderWarningIcon = (status: Status) =>
    status === Status.Warning ? (
        <WarningSign />
    ) : status === Status.Error ? (
        <ErrorSign />
    ) : null;

export const weekDaysFromSchoolDays = (schoolDays: string) =>
    weekDays.filter((_, i) => schoolDays[i] === '1');

export const getStatuses = (
    collisions: Collision[],
    subgroups: Subgroup[],
    lessonBlockId: Id
): Statuses => {
    const weights = collisions
        .filter(
            ({ collidingObject1, collidingObject2 }) =>
                collidingObject1 === lessonBlockId ||
                collidingObject2 === lessonBlockId
        )
        .map(({ collisionType }) => collisionType.weight);
    return {
        lessonBlock: weights.length
            ? weights.some((weight) => weight >= 1)
                ? Status.Error
                : Status.Warning
            : Status.Normal,
        //TODO: implement all statuses when collisions enpoint gives more information
        teacher: Status.Normal,
        subgroups: Object.fromEntries(
            subgroups.map(({ id }) => [id, Status.Normal])
        ),
        classroom: Status.Normal,
    };
};

export const parseTimetableLessonBlocks = (
    lessonBlocks: LessonBlock[],
    lessonPeriods: LessonPeriod[],
    collisions: Collision[],
    schoolDays: string
): LessonBlocks =>
    lessonPeriods.reduce(
        (prevPeriods, _, periodIndex) => ({
            ...prevPeriods,
            ...weekDaysFromSchoolDays(schoolDays).reduce(
                (prevWeekDays, weekDay) => ({
                    ...prevWeekDays,
                    [`${periodIndex}-${weekDays.indexOf(weekDay)}-cell`]:
                        lessonBlocks
                            .filter(
                                (lessonBlock) =>
                                    lessonBlock.lessonStart <= periodIndex &&
                                    lessonBlock.lessonEnd >= periodIndex &&
                                    getAdjustedDay(lessonBlock.lessonDate) ===
                                        weekDays.indexOf(weekDay)
                            )
                            .map((lessonBlock) => ({
                                data: lessonBlock,
                                statuses: getStatuses(
                                    collisions,
                                    lessonBlock.lesson.subgroups,
                                    lessonBlock.id
                                ),
                            })),
                }),
                {}
            ),
        }),
        {}
    );

export const getLessonTileStatus = (
    currentHours: number,
    amountOfHours: number
) =>
    currentHours === amountOfHours
        ? LessonTileStatus.Full
        : currentHours > amountOfHours
          ? LessonTileStatus.Overflowing
          : currentHours > 0
            ? LessonTileStatus.Filled
            : LessonTileStatus.Empty;

export const generateTreeLookupMaps = (
    groups: Group[],
    subgroups: Subgroup[],
    lessons: Lesson[],
    lessonBlocks: LessonBlock[]
) => {
    const expandedMap: Record<Id, boolean> = {};

    const subgroupsByGroup: Record<Id, Subgroup[]> = {};

    for (const subgroup of subgroups) {
        if (!subgroupsByGroup[subgroup.group.id])
            subgroupsByGroup[subgroup.group.id] = [];
        subgroupsByGroup[subgroup.group.id].push(subgroup);

        expandedMap[subgroup.id] = false;
    }

    const lessonById: Record<Id, Lesson> = Object.fromEntries(
        lessons.map((lesson) => [lesson.id, lesson])
    );
    const lessonBlocksByLesson: Record<Id, LessonBlock[]> = {};

    for (const lessonBlock of lessonBlocks) {
        if (!lessonBlocksByLesson[lessonBlock.lesson.id])
            lessonBlocksByLesson[lessonBlock.lesson.id] = [];
        lessonBlocksByLesson[lessonBlock.lesson.id].push(lessonBlock);

        expandedMap[lessonBlock.id] = false;
    }

    const lessonIdsBySubgroup: Record<Id, Id[]> = {};

    for (const lesson of lessons) {
        lesson.subgroups.forEach((subgroup) => {
            if (!lessonIdsBySubgroup[subgroup.id])
                lessonIdsBySubgroup[subgroup.id] = [];
            lessonIdsBySubgroup[subgroup.id].push(lesson.id);
        });

        expandedMap[lesson.id] = false;
    }

    for (const group of groups) {
        expandedMap[group.id] = false;
    }

    return {
        expandedMap,
        lookupMaps: {
            subgroupsByGroup,
            lessonIdsBySubgroup,
            lessonById,
            lessonBlocksByLesson,
        },
    };
};
