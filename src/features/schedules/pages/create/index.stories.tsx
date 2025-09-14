import { Meta, StoryObj } from '@storybook/react';

import Dashboard from '@/features/dashboard/template';
import { createScheduleDashboardHeader } from '@/features/schedules/constants';
import CreateSchedulePage from '@/features/schedules/pages/create/index';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Schedules Create',
    component: CreateSchedulePage,
    render: () => (
        <Dashboard headerProps={createScheduleDashboardHeader}>
            <PageStoryStyles />
            <CreateSchedulePage />
        </Dashboard>
    ),
} satisfies Meta<typeof CreateSchedulePage>;

export const Default: StoryObj<typeof CreateSchedulePage> = {};
