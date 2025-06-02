import type { Meta, StoryObj } from '@storybook/react';

import Date from '@/shared/components/Date';

export default {
    title: 'Shared/Components/Date',
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
    component: Date,
} satisfies Meta<typeof Date>;

export const Default: StoryObj<typeof Date> = {
    args: {
        label: 'Input label',
    },
};

export const WithError: StoryObj<typeof Date> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
    },
};

export const WithoutLabel: StoryObj<typeof Date> = {};
