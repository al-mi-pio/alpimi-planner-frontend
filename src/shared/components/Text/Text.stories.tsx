import type { Meta, StoryObj } from '@storybook/react';

import Text from '@/shared/components/Text';

export default {
    title: 'Shared/Components/Text',
    argTypes: {
        type: {
            options: ['text', 'password', 'email'],
            control: { type: 'select' },
            type: 'string',
            description: 'What type of value the input expects',
        },
        label: {
            type: 'string',
            description: 'Optional label placed above the input',
        },
        error: {
            type: 'string',
            description:
                'Optional error message underneath the field, also highlights the input',
        },
    },
    component: Text,
} satisfies Meta<typeof Text>;

export const Default: StoryObj<typeof Text> = {};

export const WithLabel: StoryObj<typeof Text> = {
    args: {
        label: 'Input label',
    },
};

export const WithError: StoryObj<typeof Text> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
    },
};
