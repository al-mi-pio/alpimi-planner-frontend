import type { TFunction } from 'i18next';

import type { ScheduleForm } from '@/features/schedules/types';
import {
    createSchedule,
    editSchedule,
    initialScheduleSetup,
    scheduleData,
    schedules,
    viewSchedule,
} from '@/shared/constants/routes';
import { weekDays } from '@/shared/constants/time';
import { capitalize } from '@/shared/utils/string';

export const schedulesDashboardHeader = {
    header: 'Schedule browser',
    navigation: [
        {
            label: 'Add new',
            route: createSchedule,
        },
    ],
};

export const editorDashboardHeader = (scheduleName: string) => ({
    header: scheduleName,
    navigation: [
        {
            label: 'Edit',
            route: editSchedule(scheduleName),
        },
        {
            label: 'Data',
            route: scheduleData(scheduleName),
        },
        {
            label: 'View',
            route: viewSchedule(scheduleName),
        },
    ],
    backRoute: schedules,
});

export const initialSetupDashboardHeader = (scheduleName: string) => ({
    header: 'Adding lesson periods',
    navigation: [
        {
            label: 'Add new',
            route: initialScheduleSetup(scheduleName),
        },
    ],
    backRoute: schedules,
});

export const createScheduleDashboardHeader = {
    header: 'Creating new schedule',
    navigation: [
        {
            label: 'Add new',
            route: createSchedule,
        },
    ],
    backRoute: schedules,
};

export const getDefaultScheduleForm = (t: TFunction): ScheduleForm => ({
    name: '',
    schoolHour: 45,
    schoolYearStart: '',
    schoolYearEnd: '',
    schoolDays: weekDays.slice(0, -2).map((day) => ({
        label: t(capitalize(day)),
        value: day,
    })),
});
