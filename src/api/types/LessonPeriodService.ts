import type { ApiGetAllService, Entity } from '@/api/types';

export type LessonPeriod = Entity<{
    start: string;
}>;

export type LessonPeriodGetAll = ApiGetAllService<LessonPeriod>;
