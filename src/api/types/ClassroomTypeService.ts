import type { ApiGetService, Entity } from '@/api/types';

export type ClassroomType = Entity<{
    name: string;
}>;

export type ClassroomTypeGet = ApiGetService<ClassroomType>;
