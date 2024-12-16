import type { Meta, StoryObj } from '@storybook/react';

import Text from '@/shared/components/Text';

// noinspection JSUnusedGlobalSymbols
export default {
    title: 'Shared/Components/Text',
    component: Text,
} satisfies Meta<typeof Text>;

// noinspection JSUnusedGlobalSymbols
export const Default: StoryObj<typeof Text> = {};

// noinspection JSUnusedGlobalSymbols
export const WithLabel: StoryObj<typeof Text> = {
    args: {
        label: 'Input label',
    },
};

// noinspection JSUnusedGlobalSymbols
export const WithError: StoryObj<typeof Text> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
    },
};
