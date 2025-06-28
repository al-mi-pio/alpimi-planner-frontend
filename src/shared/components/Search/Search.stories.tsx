import type { Meta, StoryObj } from '@storybook/react';

import Search from '@/shared/components/Search';

export default {
    title: 'Shared/Components/Search',
    component: Search,
} satisfies Meta<typeof Search>;

export const Default: StoryObj<typeof Search> = {};
