import type { Meta, StoryObj } from '@storybook/react';

import Number from '@/shared/components/Number';

export default {
    title: 'Shared/Components/Number',
    argTypes: {
        label: {
            type: 'string',
            description: 'Optional label that describes the input',
        },
        error: {
            type: 'string',
            description: 'Optional error message, also highlights the input',
        },
    },
    component: Number,
} satisfies Meta<typeof Number>;

export const Default: StoryObj<typeof Number> = {
    args: {
        label: 'Input label',
    },
};

export const WithError: StoryObj<typeof Number> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
    },
};

export const WithoutLabel: StoryObj<typeof Number> = {};
