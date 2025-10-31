import type { Meta, StoryObj } from '@storybook/react';

import Dashboard from '@/features/dashboard/template';
import { createScheduleDashboardHeader } from '@/features/schedules/constants';
import CreateSchedulePage from '@/features/schedules/pages/create';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Schedules Create',
    tags: ['!autodocs'],
    component: CreateSchedulePage,
    render: () => (
        <Dashboard headerProps={createScheduleDashboardHeader}>
            <PageStoryStyles />
            <CreateSchedulePage />
        </Dashboard>
    ),
} satisfies Meta<typeof CreateSchedulePage>;

export const SchedulesCreate: StoryObj<typeof CreateSchedulePage> = {};
