import { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import Button from '@/shared/components/Button';

export default {
    title: 'Shared/Components/Button',
    argTypes: {
        appearance: {
            options: ['primary', 'secondary'],
            control: { type: 'radio' },
            type: 'string',
            description: 'The appearance of the button',
        },
        label: {
            description: 'Text label that describes the button',
        },
        onClick: {
            description:
                'Function that will be called when a button is clicked',
        },
    },
    component: Button,
} satisfies Meta<typeof Button>;

export const Default: StoryObj<typeof Button> = {
    args: {
        appearance: 'primary',
        label: 'Click me!',
        onClick: fn(),
    },
};
