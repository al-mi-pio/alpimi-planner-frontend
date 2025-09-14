import { Meta, StoryObj } from '@storybook/react';

import Dashboard from '@/features/dashboard/template';
import { schedulesDashboardHeader } from '@/features/schedules/constants';
import SchedulesPage from '@/features/schedules/pages/list/index';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Schedules List',
    component: SchedulesPage,
    render: () => (
        <Dashboard headerProps={schedulesDashboardHeader}>
            <PageStoryStyles />
            <SchedulesPage />
        </Dashboard>
    ),
} satisfies Meta<typeof SchedulesPage>;

export const Default: StoryObj<typeof SchedulesPage> = {};
