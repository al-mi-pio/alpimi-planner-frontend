import type { AxiosRequestConfig } from 'axios';

import type {
    ApiGetAllService,
    ApiPostService,
    Entity,
    GetResponse,
} from '@/api/types';

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
export type ScheduleGetByName = (
    customUrl: string,
    name: string,
    config?: AxiosRequestConfig
) => Promise<GetResponse<Schedule>>;
