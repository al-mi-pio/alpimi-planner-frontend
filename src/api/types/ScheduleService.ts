import { ApiGetAllService, ApiPostService } from '@/api/types';

export interface Schedule {
    name: string;
    modifyDate: string;
}

export interface CreateScheduleDTO {
    name: string;
    schoolHour: number | null;
    schoolYearStart: string | null;
    schoolYearEnd: string | null;
    schoolDays: string;
}

export type ScheduleGetAll = ApiGetAllService<Schedule>;
export type SchedulePost = ApiPostService<CreateScheduleDTO>;
