import type { Meta, StoryObj } from '@storybook/react';

import Text from '@/shared/components/Text';

const meta = {
    title: 'Shared/Components/Text',
    component: Text,
} satisfies Meta<typeof Text>;

// noinspection JSUnusedGlobalSymbols
export default meta;
type Story = StoryObj<typeof meta>;

// noinspection JSUnusedGlobalSymbols
export const Default: Story = {};

// noinspection JSUnusedGlobalSymbols
export const WithLabel: Story = {
    args: {
        label: 'Input label',
    },
};

// noinspection JSUnusedGlobalSymbols
export const WithError: Story = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
    },
};
