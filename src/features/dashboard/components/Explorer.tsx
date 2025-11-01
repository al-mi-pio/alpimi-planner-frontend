import { use, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classroomGetAll } from '@/api/services/classroomService';
import { groupGetAll } from '@/api/services/groupService';
import { lessonBlockGetAll } from '@/api/services/lessonBlockService';
import { subgroupGetAll } from '@/api/services/subgroupService';
import { getTeacherName, teacherGetAll } from '@/api/services/teacherService';
import { EntityType, type Id } from '@/api/types';
import type { Lesson } from '@/api/types/LessonService';
import type { Schedule } from '@/api/types/ScheduleService';
import { WindowWithTabs } from '@/features/dashboard/components/WindowWithTabs';
import { CurrentTimetableFiltersContext } from '@/features/dashboard/contexts';
import { usePropertiesWindow } from '@/features/dashboard/hooks/usePropertiesWindow';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import { generateTreeLookupMaps } from '@/features/dashboard/utils';
import { Tree, TreeItem } from '@/shared/components/Tree';
import { useGetData } from '@/shared/hooks/useGetData';
import Book from '@/shared/icons/Book';
import Calendar from '@/shared/icons/Calendar';
import Clock from '@/shared/icons/Clock';
import Doors from '@/shared/icons/Doors';
import Group from '@/shared/icons/Group';
import Tag from '@/shared/icons/Tag';
import UserCircle from '@/shared/icons/UserCircle';
import { addDaysToDate, getFirstDayOfWeek } from '@/shared/utils/date';
import { sortBy } from '@/shared/utils/string';

export const Explorer = ({
    lessons,
    schedule,
    isLoading,
}: {
    lessons?: Lesson[];
    schedule?: Schedule;
    isLoading: boolean;
}) => {
    const { t } = useTranslation('dashboard');
    const [, setCurrentTimetableFilters] = use(CurrentTimetableFiltersContext);
    const { selectedEntity, setSelectedEntity } = usePropertiesWindow();
    const [expandedState, setExpandedState] = useState<Record<Id, boolean>>({});
    const [lookupMaps, setLookupMaps] =
        useState<ReturnType<typeof generateTreeLookupMaps>['lookupMaps']>();

    const { data: groups, isLoading: isGroupLoading } = useGetData({
        queryKey: ['group', schedule?.id],
        queryFn: () =>
            groupGetAll({
                params: { scheduleId: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const { data: subgroups, isLoading: isSubgroupLoading } = useGetData({
        queryKey: ['subgroup', schedule?.id],
        queryFn: () =>
            subgroupGetAll({
                params: { id: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const { data: lessonBlocks, isLoading: isLessonBlockLoading } = useGetData({
        queryKey: ['lessonBlock', schedule?.id],
        queryFn: () =>
            lessonBlockGetAll({
                params: {
                    id: schedule ? schedule.id : '0-0-0-0-0',
                },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const { data: teachers, isLoading: isTeacherLoading } = useGetData({
        queryKey: ['teacher', schedule?.id],
        queryFn: () =>
            teacherGetAll({
                params: {
                    scheduleId: schedule ? schedule.id : '0-0-0-0-0',
                },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const { data: classrooms, isLoading: isClassroomLoading } = useGetData({
        queryKey: ['classroom', schedule?.id],
        queryFn: () =>
            classroomGetAll({
                params: {
                    id: schedule ? schedule.id : '0-0-0-0-0',
                },
            }),
        select: (data) => data.content,
        enabled: !!schedule,
    });

    const onExpanded = (itemName?: string) =>
        setExpandedState((prevState) => ({
            ...prevState,
            [itemName!]: !prevState[itemName as keyof typeof itemName],
        }));

    useEffect(() => {
        if (groups && subgroups && lessons && lessonBlocks) {
            const { expandedMap, lookupMaps } = generateTreeLookupMaps(
                groups,
                subgroups,
                lessons,
                lessonBlocks
            );
            setLookupMaps(lookupMaps);
            setExpandedState(expandedMap);
        }
    }, [groups, subgroups, lessons, lessonBlocks]);

    const renderTree = (
        type: EntityType.Group | EntityType.Teacher | EntityType.Classroom
    ) => {
        if (!Object.keys(expandedState).length || !lookupMaps || !groups)
            return null;

        if (type === EntityType.Teacher) {
            if (!teachers) return null;
            return (
                <Tree tabIndex={0}>
                    {teachers.map((teacher) => (
                        <TreeItem
                            key={teacher.id}
                            icon={<UserCircle />}
                            label={getTeacherName(teacher)}
                            isExpanded={expandedState[teacher.id]}
                            onExpanded={onExpanded}
                            isSelected={
                                selectedEntity
                                    ? selectedEntity.id === teacher.id
                                    : undefined
                            }
                            onDoubleClick={() =>
                                setCurrentTimetableFilters(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            entityName: getTeacherName(teacher),
                                            entityId: teacher.id,
                                        }
                                )
                            }
                            onSelected={(id) =>
                                setSelectedEntity({
                                    entity: EntityType.Teacher,
                                    id: id ? (id as Id) : '0-0-0-0-0',
                                })
                            }
                            value={teacher.id}
                        />
                    ))}
                </Tree>
            );
        }

        if (type === EntityType.Classroom) {
            if (!classrooms) return null;
            return (
                <Tree tabIndex={0}>
                    {classrooms.map((classroom) => (
                        <TreeItem
                            key={classroom.id}
                            icon={<Doors />}
                            label={classroom.name}
                            isExpanded={expandedState[classroom.id]}
                            onExpanded={onExpanded}
                            isSelected={
                                selectedEntity
                                    ? selectedEntity.id === classroom.id
                                    : undefined
                            }
                            onDoubleClick={() =>
                                setCurrentTimetableFilters(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            entityName: classroom.name,
                                            entityId: classroom.id,
                                        }
                                )
                            }
                            onSelected={(id) =>
                                setSelectedEntity({
                                    entity: EntityType.Classroom,
                                    id: id ? (id as Id) : '0-0-0-0-0',
                                })
                            }
                            value={classroom.id}
                        >
                            {classroom.classroomTypes.map((classroomType) => (
                                <TreeItem
                                    key={classroomType.id}
                                    icon={<Tag />}
                                    label={classroomType.name}
                                    isSelected={
                                        selectedEntity
                                            ? selectedEntity.id ===
                                              classroomType.id
                                            : undefined
                                    }
                                    onDoubleClick={() =>
                                        setCurrentTimetableFilters(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    entityName:
                                                        classroomType.name,
                                                    entityId: classroomType.id,
                                                }
                                        )
                                    }
                                    onSelected={(id) =>
                                        setSelectedEntity({
                                            entity: EntityType.ClassroomType,
                                            id: id ? (id as Id) : '0-0-0-0-0',
                                        })
                                    }
                                    value={classroomType.id}
                                />
                            ))}
                        </TreeItem>
                    ))}
                </Tree>
            );
        }

        const {
            subgroupsByGroup,
            lessonIdsBySubgroup,
            lessonById,
            lessonBlocksByLesson,
        } = lookupMaps;

        return (
            <Tree tabIndex={0}>
                {groups.toSorted(sortBy('name')).map((group) => (
                    <TreeItem
                        key={group.id}
                        icon={<Group />}
                        label={group.name}
                        isExpanded={expandedState[group.id]}
                        onExpanded={onExpanded}
                        isSelected={
                            selectedEntity
                                ? selectedEntity.id === group.id
                                : undefined
                        }
                        onDoubleClick={() =>
                            setCurrentTimetableFilters(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        entityName: group.name,
                                        entityId: group.id,
                                    }
                            )
                        }
                        onSelected={(id) =>
                            setSelectedEntity({
                                entity: EntityType.Group,
                                id: id ? (id as Id) : '0-0-0-0-0',
                            })
                        }
                        value={group.id}
                    >
                        {(subgroupsByGroup[group.id] || [])
                            .toSorted(sortBy('name'))
                            .map((subgroup) => (
                                <TreeItem
                                    key={subgroup.id}
                                    icon={<Group />}
                                    label={subgroup.name}
                                    isExpanded={expandedState[subgroup.id]}
                                    onExpanded={onExpanded}
                                    isSelected={
                                        selectedEntity
                                            ? selectedEntity.id === subgroup.id
                                            : undefined
                                    }
                                    onDoubleClick={() =>
                                        setCurrentTimetableFilters(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    entityName: subgroup.name,
                                                    entityId: subgroup.id,
                                                }
                                        )
                                    }
                                    onSelected={(id) =>
                                        setSelectedEntity({
                                            entity: EntityType.Subgroup,
                                            id: id ? (id as Id) : '0-0-0-0-0',
                                        })
                                    }
                                    value={subgroup.id}
                                >
                                    {(lessonIdsBySubgroup[subgroup.id] || [])
                                        .map((lessonId) => lessonById[lessonId])
                                        .toSorted(sortBy('name'))
                                        .map((lesson) => (
                                            <TreeItem
                                                key={lesson.id}
                                                icon={<Book />}
                                                label={lesson.name}
                                                isExpanded={
                                                    expandedState[lesson.id]
                                                }
                                                onExpanded={onExpanded}
                                                isSelected={
                                                    selectedEntity
                                                        ? selectedEntity.id ===
                                                          lesson.id
                                                        : undefined
                                                }
                                                onDoubleClick={() =>
                                                    setCurrentTimetableFilters(
                                                        (prev) =>
                                                            prev && {
                                                                ...prev,
                                                                entityName:
                                                                    lesson.name,
                                                                entityId:
                                                                    lesson.id,
                                                            }
                                                    )
                                                }
                                                onSelected={(id) =>
                                                    setSelectedEntity({
                                                        entity: EntityType.Lesson,
                                                        id: id
                                                            ? (id as Id)
                                                            : '0-0-0-0-0',
                                                    })
                                                }
                                                value={lesson.id}
                                            >
                                                {(
                                                    lessonBlocksByLesson[
                                                        lesson.id
                                                    ] || []
                                                )
                                                    .toSorted(
                                                        sortBy('lessonDate')
                                                    )
                                                    .map((lessonBlock) => (
                                                        <TreeItem
                                                            key={lessonBlock.id}
                                                            icon={<Calendar />}
                                                            label={lessonBlock.lessonDate.replaceAll(
                                                                '-',
                                                                '.'
                                                            )}
                                                            isExpanded={
                                                                expandedState[
                                                                    lessonBlock
                                                                        .id
                                                                ]
                                                            }
                                                            onExpanded={
                                                                onExpanded
                                                            }
                                                            isSelected={
                                                                selectedEntity
                                                                    ? selectedEntity.id ===
                                                                      lessonBlock.id
                                                                    : undefined
                                                            }
                                                            onDoubleClick={() =>
                                                                setCurrentTimetableFilters(
                                                                    (prev) =>
                                                                        prev && {
                                                                            ...prev,
                                                                            entityName:
                                                                                subgroup.name,
                                                                            entityId:
                                                                                subgroup.id,
                                                                            fromDate:
                                                                                getFirstDayOfWeek(
                                                                                    lessonBlock.lessonDate
                                                                                ),
                                                                            toDate: addDaysToDate(
                                                                                getFirstDayOfWeek(
                                                                                    lessonBlock.lessonDate
                                                                                ),
                                                                                6
                                                                            ),
                                                                        }
                                                                )
                                                            }
                                                            onSelected={(id) =>
                                                                setSelectedEntity(
                                                                    {
                                                                        entity: EntityType.LessonBlock,
                                                                        id: id
                                                                            ? (id as Id)
                                                                            : '0-0-0-0-0',
                                                                    }
                                                                )
                                                            }
                                                            value={
                                                                lessonBlock.id
                                                            }
                                                        >
                                                            <TreeItem
                                                                key={`time-${lessonBlock.id}`}
                                                                icon={<Clock />}
                                                                label={
                                                                    lessonBlock.lessonStart ===
                                                                    lessonBlock.lessonEnd
                                                                        ? `${t('Lesson')} ${lessonBlock.lessonStart + 1}`
                                                                        : `${t('Lessons')} ${lessonBlock.lessonStart + 1} - ${lessonBlock.lessonEnd + 1}`
                                                                }
                                                                isSelected={
                                                                    selectedEntity
                                                                        ? selectedEntity.id ===
                                                                          lessonBlock.id
                                                                        : undefined
                                                                }
                                                                onDoubleClick={() =>
                                                                    setCurrentTimetableFilters(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            prev && {
                                                                                ...prev,
                                                                                entityName:
                                                                                    subgroup.name,
                                                                                entityId:
                                                                                    subgroup.id,
                                                                                fromDate:
                                                                                    getFirstDayOfWeek(
                                                                                        lessonBlock.lessonDate
                                                                                    ),
                                                                                toDate: addDaysToDate(
                                                                                    getFirstDayOfWeek(
                                                                                        lessonBlock.lessonDate
                                                                                    ),
                                                                                    6
                                                                                ),
                                                                            }
                                                                    )
                                                                }
                                                                onSelected={(
                                                                    id
                                                                ) =>
                                                                    setSelectedEntity(
                                                                        {
                                                                            entity: EntityType.LessonBlock,
                                                                            id: id
                                                                                ? (id as Id)
                                                                                : '0-0-0-0-0',
                                                                        }
                                                                    )
                                                                }
                                                                value={
                                                                    lessonBlock.id
                                                                }
                                                            />
                                                        </TreeItem>
                                                    ))}
                                            </TreeItem>
                                        ))}
                                </TreeItem>
                            ))}
                    </TreeItem>
                ))}
            </Tree>
        );
    };

    const content = [
        {
            id: 'groups',
            label: t('Groups'),
            content: renderTree(EntityType.Group),
        },
        {
            id: 'teachers',
            label: t('Teachers'),
            content: renderTree(EntityType.Teacher),
        },
        {
            id: 'classrooms',
            label: t('Classrooms'),
            content: renderTree(EntityType.Classroom),
        },
    ];

    if (
        isLoading ||
        isGroupLoading ||
        isSubgroupLoading ||
        isLessonBlockLoading ||
        isTeacherLoading ||
        isClassroomLoading
    ) {
        return <StyledLoading />;
    }

    return <WindowWithTabs tabs={content} />;
};
