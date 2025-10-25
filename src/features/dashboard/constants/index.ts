import { classroomGet } from '@/api/services/classroomService';
import { classroomTypeGet } from '@/api/services/classroomTypeService';
import { groupGet } from '@/api/services/groupService';
import { lessonBlockGet } from '@/api/services/lessonBlockService';
import { lessonGet } from '@/api/services/lessonService';
import { subgroupGet } from '@/api/services/subgroupService';
import { teacherGet } from '@/api/services/teacherService';
import { EntityType, type GetResponse, type Id } from '@/api/types';
import type { Classroom } from '@/api/types/ClassroomService';
import type { ClassroomType } from '@/api/types/ClassroomTypeService';
import type { Group } from '@/api/types/GroupService';
import type { LessonBlock } from '@/api/types/LessonBlockService';
import type { Lesson } from '@/api/types/LessonService';
import type { Subgroup } from '@/api/types/SubgroupService';
import type { Teacher } from '@/api/types/TeacherService';

export const MAP_ENTITY_METHOD: Record<
    EntityType[number],
    (
        id: Id
    ) => () => Promise<
        GetResponse<
            | Classroom
            | ClassroomType
            | Group
            | LessonBlock
            | Lesson
            | Subgroup
            | Teacher
        >
    >
> = {
    [EntityType.Classroom]: (id) => () => classroomGet(id),
    [EntityType.ClassroomType]: (id) => () => classroomTypeGet(id),
    [EntityType.Group]: (id) => () => groupGet(id),
    [EntityType.LessonBlock]: (id) => () => lessonBlockGet(id),
    [EntityType.Lesson]: (id) => () => lessonGet(id),
    [EntityType.Subgroup]: (id) => () => subgroupGet(id),
    [EntityType.Teacher]: (id) => () => teacherGet(id),
};
