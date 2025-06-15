import type { Meta, StoryObj } from '@storybook/react';

import Text from '@/shared/components/Text';

export default {
    title: 'Shared/Components/Text',
    argTypes: {
        type: {
            options: ['text', 'password', 'email'],
            control: { type: 'select' },
        },
    },
    component: Text,
} satisfies Meta<typeof Text>;

export const Default: StoryObj<typeof Text> = {
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

export const WithoutLabel: StoryObj<typeof Text> = {};
