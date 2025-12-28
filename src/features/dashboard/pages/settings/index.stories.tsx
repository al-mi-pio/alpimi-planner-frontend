import type { Meta, StoryObj } from '@storybook/react';

import SettingsPage from '@/features/dashboard/pages/settings/index';
import Dashboard from '@/features/dashboard/template';
import { editorDashboardHeader } from '@/features/schedules/constants';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Schedule Settings',
    tags: ['!autodocs'],
    component: SettingsPage,
    render: () => {
        return (
            <Dashboard headerProps={editorDashboardHeader('mockScheduleName')}>
                <PageStoryStyles />
                <SettingsPage />
            </Dashboard>
        );
    },
} satisfies Meta<typeof SettingsPage>;

export const ScheduleSettings: StoryObj<typeof SettingsPage> = {};
