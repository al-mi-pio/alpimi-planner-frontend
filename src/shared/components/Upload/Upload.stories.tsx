import type { Meta, StoryObj } from '@storybook/react';

import Upload from '@/shared/components/Upload';

export default {
    title: 'Shared/Components/Upload',
    component: Upload,
} satisfies Meta<typeof Upload>;

export const Default: StoryObj<typeof Upload> = {
    args: {
        label: 'Input label',
    },
};

export const WithError: StoryObj<typeof Upload> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
    },
};

export const WithoutLabel: StoryObj<typeof Upload> = {};
