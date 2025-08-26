import { ApiGetAllService } from '@/api/types';

export interface Schedule {
    name: string;
    modifyDate: string;
}

export type ScheduleGetAll = ApiGetAllService<Schedule>;
