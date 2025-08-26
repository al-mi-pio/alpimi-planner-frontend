import { createSchedule } from '@/shared/constants/routes';

export const schedulesDashboardHeader = {
    header: 'Schedule browser',
    navigation: [
        {
            label: 'Create new',
            route: createSchedule,
        },
    ],
};
