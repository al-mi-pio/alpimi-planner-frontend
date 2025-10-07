import type { ApiGetAllService, ApiPostService, Entity } from '@/api/types';

export type Schedule = Entity<{
    name: string;
    modifyDate: string;
}>;

export interface CreateScheduleDTO {
    name: string;
    schoolHour: number | null;
    schoolYearStart: string | null;
    schoolYearEnd: string | null;
    schoolDays: string;
}

export type ScheduleGetAll = ApiGetAllService<Schedule>;
export type SchedulePost = ApiPostService<CreateScheduleDTO>;
