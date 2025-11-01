import type { ApiGetAllService, ApiGetService, Entity } from '@/api/types';

export type Group = Entity<{
    name: string;
    studentCount: number;
}>;

export type GroupGetAll = ApiGetAllService<Group>;
export type GroupGet = ApiGetService<Group>;
