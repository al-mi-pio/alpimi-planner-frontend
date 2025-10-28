import type {
    ApiDeleteService,
    ApiGetAllService,
    ApiPostService,
    Entity,
    Id,
} from '@/api/types';

export type LessonPeriod = Entity<{
    start: string;
}>;

export interface CreateLessonPeriodDTO {
    scheduleId: Id;
    start: string;
}

export type LessonPeriodGetAll = ApiGetAllService<LessonPeriod>;
export type LessonPeriodPost = ApiPostService<CreateLessonPeriodDTO>;
export type LessonPeriodDelete = ApiDeleteService;
