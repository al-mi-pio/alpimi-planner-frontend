import type { Meta, StoryObj } from '@storybook/react';
import { useQueryClient } from '@tanstack/react-query';

import InitialSetupPage from '@/features/dashboard/pages/initialSetup/index';
import Dashboard from '@/features/dashboard/template';
import { initialSetupDashboardHeader } from '@/features/schedules/constants';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Initial Setup',
    tags: ['!autodocs'],
    component: InitialSetupPage,
    render: () => {
        const queryClient = useQueryClient();

        queryClient.setQueryData(['lessonPeriod', '0-0-0-0-2'], {
            content: [],
        });

        return (
            <Dashboard
                headerProps={initialSetupDashboardHeader('mockScheduleName')}
            >
                <PageStoryStyles />
                <InitialSetupPage />
            </Dashboard>
        );
    },
} satisfies Meta<typeof InitialSetupPage>;

export const InitialSetup: StoryObj<typeof InitialSetupPage> = {};
