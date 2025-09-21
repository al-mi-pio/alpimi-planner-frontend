import { Meta, StoryObj } from '@storybook/react';

import Page404 from '@/features/main/pages/404';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/404',
    component: Page404,
    render: () => (
        <>
            <PageStoryStyles />
            <Page404 />
        </>
    ),
} satisfies Meta<typeof Page404>;

export const Default: StoryObj<typeof Page404> = {};
