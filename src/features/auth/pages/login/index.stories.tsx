import type { Meta, StoryObj } from '@storybook/react';

import LoginPage from '@/features/auth/pages/login';
import Auth from '@/features/auth/template';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Login',
    component: LoginPage,
    render: () => (
        <Auth>
            <PageStoryStyles />
            <LoginPage />
        </Auth>
    ),
} satisfies Meta<typeof LoginPage>;

export const Default: StoryObj<typeof LoginPage> = {};
