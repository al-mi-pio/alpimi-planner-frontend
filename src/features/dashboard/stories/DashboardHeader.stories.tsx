import type { Meta, StoryObj } from '@storybook/react';

import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';

export default {
    title: 'Features/Dashboard/Components/DashboardHeader',
    component: DashboardHeader,
} satisfies Meta<typeof DashboardHeader>;

export const Default: StoryObj<typeof DashboardHeader> = {
    args: {
        header: 'Main page',
        backRoute: '/',
        navigation: [
            { label: 'Data', route: '/test' },
            { label: 'Edit', route: '/' },
            { label: 'View', route: '/test2' },
        ],
    },
};

export const NoComingBack: StoryObj<typeof DashboardHeader> = {
    args: {
        header: 'Main page',
        navigation: [
            { label: 'Data', route: '/test' },
            { label: 'Edit', route: '/' },
            { label: 'View', route: '/test2' },
        ],
    },
};
