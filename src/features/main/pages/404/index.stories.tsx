import type { Meta, StoryObj } from '@storybook/react';

import { AuthBodyStoriesStyles } from '@/features/auth/styles/Auth.style';
import Page404 from '@/features/main/pages/404';

export default {
    title: 'Pages/404',
    tags: ['!autodocs'],
    component: Page404,
    render: () => (
        <>
            <AuthBodyStoriesStyles />
            <Page404 />
        </>
    ),
} satisfies Meta<typeof Page404>;

export const _404: StoryObj<typeof Page404> = {};
