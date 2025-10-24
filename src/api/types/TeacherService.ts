import type { ApiGetAllService, Entity } from '@/api/types';

export type Teacher = Entity<{
    name: string;
    surname: string;
}>;

export type TeacherGetAll = ApiGetAllService<Teacher>;
