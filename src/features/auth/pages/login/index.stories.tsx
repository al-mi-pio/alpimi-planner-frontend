import { Meta, StoryObj } from '@storybook/react';

import LoginPage from '@/features/auth/pages/login';
import Auth from '@/features/auth/template';

export default {
    title: 'Pages/Login',
    component: LoginPage,
    render: () => (
        <Auth>
            <LoginPage />
        </Auth>
    ),
} satisfies Meta<typeof LoginPage>;

export const Default: StoryObj<typeof LoginPage> = {};
