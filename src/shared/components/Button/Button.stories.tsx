import { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import Button from '@/shared/components/Button';

// noinspection JSUnusedGlobalSymbols
export default {
    title: 'Shared/Components/Button',
    argTypes: {
        appearance: {
            options: ['primary', 'secondary'],
            control: { type: 'radio' },
        },
    },
    component: Button,
} satisfies Meta<typeof Button>;

// noinspection JSUnusedGlobalSymbols
export const Default: StoryObj<typeof Button> = {
    args: {
        appearance: 'primary',
        label: 'Click me!',
        onClick: fn(),
    },
};
