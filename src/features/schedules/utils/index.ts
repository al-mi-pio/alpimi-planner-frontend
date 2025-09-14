import { ScheduleForm } from '@/features/schedules/types';
import { weekDays } from '@/shared/constants/time';

export const scheduleFormToDTO = (form: ScheduleForm) => ({
    name: form.name,
    schoolHour: form.schoolHour || null,
    schoolYearStart: form.schoolYearStart || null,
    schoolYearEnd: form.schoolYearEnd || null,
    schoolDays: weekDays.reduce(
        (prev, weekDay) =>
            prev +
            (form.schoolDays.find(({ value }) => value === weekDay)
                ? '1'
                : '0'),
        ''
    ),
});
