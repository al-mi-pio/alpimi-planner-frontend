import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@/shared/components/Checkbox';

export default {
    title: 'Shared/Components/Checkbox',
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
    component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export const Default: StoryObj<typeof Checkbox> = {
    args: {
        label: 'Input label',
    },
};

export const WithError: StoryObj<typeof Checkbox> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
    },
};

export const WithoutLabel: StoryObj<typeof Checkbox> = {};
