import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { fn } from '@storybook/test';

const meta = {
    title: 'Example/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas.
        layout: 'centered',
    },
    // Make the backgroundColor control a color picker
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

// noinspection JSUnusedGlobalSymbols
export default meta;
type Story = StoryObj<typeof meta>;

// noinspection JSUnusedGlobalSymbols
export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};

// noinspection JSUnusedGlobalSymbols
export const Secondary: Story = {
    args: {
        label: 'Button',
    },
};

// noinspection JSUnusedGlobalSymbols
export const Large: Story = {
    args: {
        size: 'large',
        label: 'Button',
    },
};

// noinspection JSUnusedGlobalSymbols
export const Small: Story = {
    args: {
        size: 'small',
        label: 'Button',
    },
};
