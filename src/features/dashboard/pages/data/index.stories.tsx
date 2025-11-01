import type { Meta, StoryObj } from '@storybook/react';

import DataPage from '@/features/dashboard/pages/data/index';
import Dashboard from '@/features/dashboard/template';
import { editorDashboardHeader } from '@/features/schedules/constants';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Schedules Data',
    tags: ['!autodocs'],
    component: DataPage,
    render: () => (
        <Dashboard headerProps={editorDashboardHeader('mockScheduleName')}>
            <PageStoryStyles />
            <DataPage />
        </Dashboard>
    ),
} satisfies Meta<typeof DataPage>;

export const SchedulesData: StoryObj<typeof DataPage> = {};
