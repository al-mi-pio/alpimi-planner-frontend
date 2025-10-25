import type { ApiGetAllService, Entity } from '@/api/types';

export type DayOff = Entity<{
    name: string;
    from: string;
    to: string;
}>;

export type DayOffGetAll = ApiGetAllService<DayOff>;
