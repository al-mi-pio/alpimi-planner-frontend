import type {
    ApiDeleteService,
    ApiGetAllService,
    ApiGetService,
    ApiPatchService,
    ApiPostService,
    Entity,
    Id,
} from '@/api/types';
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

export interface CreateLessonBlockDTO {
    lessonDate: string;
    lessonStart: number;
    lessonEnd: number;
    lessonId: Id;
    classroomId: Id | null;
    weekInterval: number | null;
}

export type PatchLessonBlockDTO = Partial<{
    weekDay: number;
    lessonStart: number;
    lessonEnd: number;
    classroomId: Id;
}>;

export type LessonBlockPost = ApiPostService<CreateLessonBlockDTO>;
export type LessonBlockGetAll = ApiGetAllService<LessonBlock>;
export type LessonBlockDelete = ApiDeleteService;
export type LessonBlockPatch = ApiPatchService<PatchLessonBlockDTO>;
export type LessonBlockGet = ApiGetService<LessonBlock>;
