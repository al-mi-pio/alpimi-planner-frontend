import { ScheduleForm } from '@/features/schedules/types';
import { weekDays } from '@/shared/constants/time';

export const schoolDaysToDTO = (schoolDays: string) => {
    const restOfWeek = schoolDays.slice(0, -1);
    return [schoolDays.at(-1), ...restOfWeek].join('');
};

export const schoolDaysFromDTO = (schoolDays: string) => {
    const [sunday, ...restOfWeek] = schoolDays;
    return [...restOfWeek, sunday].join('');
};

export const scheduleFormToDTO = (form: ScheduleForm) => ({
    name: form.name,
    schoolHour: form.schoolHour || null,
    schoolYearStart: form.schoolYearStart || null,
    schoolYearEnd: form.schoolYearEnd || null,
    schoolDays: schoolDaysToDTO(
        weekDays.reduce(
            (prev, weekDay) =>
                prev +
                (form.schoolDays.find(({ value }) => value === weekDay)
                    ? '1'
                    : '0'),
            ''
        )
    ),
});
