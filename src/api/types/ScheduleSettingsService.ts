import type { ApiGetService, ApiPatchService, Entity } from '@/api/types';

export type ScheduleSettings = Entity<{
    schoolHour: number;
    schoolYearStart: string;
    schoolYearEnd: string;
    schoolDays: string;
    isPublic: boolean;
}>;

export type PatchScheduleSettingsDTO = Partial<ScheduleSettings>;

export type ScheduleSettingsPatch = ApiPatchService<PatchScheduleSettingsDTO>;
export type ScheduleSettingsGet = ApiGetService<ScheduleSettings>;
