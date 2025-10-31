import type { Meta, StoryObj } from '@storybook/react';

import EditPage from '@/features/dashboard/pages/edit/index';
import Dashboard from '@/features/dashboard/template';
import { editorDashboardHeader } from '@/features/schedules/constants';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Schedules Edit',
    tags: ['!autodocs'],
    component: EditPage,
    render: () => (
        <Dashboard headerProps={editorDashboardHeader('mockScheduleName')}>
            <PageStoryStyles />
            <EditPage />
        </Dashboard>
    ),
} satisfies Meta<typeof EditPage>;

export const SchedulesEdit: StoryObj<typeof EditPage> = {};
