import type { Meta, StoryObj } from '@storybook/react';

import LoginPage from '@/features/auth/pages/login';
import { AuthBodyStoriesStyles } from '@/features/auth/styles/Auth.style';
import Auth from '@/features/auth/template';

export default {
    title: 'Pages/Login',
    tags: ['!autodocs'],
    component: LoginPage,
    render: () => (
        <Auth>
            <AuthBodyStoriesStyles />
            <LoginPage />
        </Auth>
    ),
} satisfies Meta<typeof LoginPage>;

export const Login: StoryObj<typeof LoginPage> = {};
