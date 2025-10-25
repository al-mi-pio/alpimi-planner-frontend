import type { ApiGetService, Entity } from '@/api/types';

export type ScheduleSettings = Entity<{
    schoolHour: number;
    schoolYearStart: string;
    schoolYearEnd: string;
    schoolDays: string;
    isPublic: boolean;
}>;

export type ScheduleSettingsGet = ApiGetService<ScheduleSettings>;
