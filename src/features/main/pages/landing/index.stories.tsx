import type { Meta, StoryObj } from '@storybook/react';

import LandingPage from '@/features/main/pages/landing/index';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Landing',
    tags: ['!autodocs'],
    component: LandingPage,
    render: () => (
        <>
            <PageStoryStyles />
            <LandingPage />
        </>
    ),
} satisfies Meta<typeof LandingPage>;

export const Landing: StoryObj<typeof LandingPage> = {};
