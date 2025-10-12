import type { ApiGetAllService, Entity, Id } from '@/api/types';
import type { Classroom } from '@/api/types/ClassroomService';
import type { Lesson } from '@/api/types/LessonService';

export type LessonBlock = Entity<{
    lessonDate: string;
    lessonStart: number;
    lessonEnd: number;
    lesson: Lesson;
    classroom: Classroom;
    clusterId: Id;
}>;

export type LessonBlockGetAll = ApiGetAllService<LessonBlock>;
