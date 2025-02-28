import type { Meta, StoryObj } from '@storybook/react';

import Text from '@/shared/components/Text';

export default {
    title: 'Shared/Components/Text',
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
