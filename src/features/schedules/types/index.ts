import { WeekDay } from '@/shared/constants/time';

export interface ScheduleForm {
    name: string;
    schoolHour: number;
    schoolYearStart: string;
    schoolYearEnd: string;
    schoolDays: { label: string; value: WeekDay }[];
}
