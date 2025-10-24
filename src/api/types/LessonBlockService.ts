import type { ApiGetAllService, ApiGetService, Entity, Id } from '@/api/types';
import type { Classroom } from '@/api/types/ClassroomService';
import type { Lesson } from '@/api/types/LessonService';

export type LessonBlock = Entity<{
    lessonDate: string;
    lessonStart: number;
    lessonEnd: number;
    lesson: Lesson;
    classroom: Classroom | null;
    clusterId: Id;
}>;

export type LessonBlockGetAll = ApiGetAllService<LessonBlock>;
export type LessonBlockGet = ApiGetService<LessonBlock>;
