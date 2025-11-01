import type { ApiGetService, Entity } from '@/api/types';

export type User = Entity<{
    login: string;
    customURL: string;
}>;

export type UserGet = ApiGetService<User>;
