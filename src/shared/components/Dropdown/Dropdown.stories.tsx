import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import Dropdown, { DropdownItem } from '@/shared/components/Dropdown';
import UserCircle from '@/shared/icons/UserCircle';

export default {
    title: 'Shared/Components/Dropdown',
    component: Dropdown,
} satisfies Meta<typeof Dropdown>;

const children = (
    <>
        <DropdownItem onClick={fn()}>{'Item 1'}</DropdownItem>
        <DropdownItem onClick={fn()}>{'Item 2 with longer name'}</DropdownItem>
    </>
);

export const Default: StoryObj<typeof Dropdown> = {
    args: {
        label: 'Example dropdown',
        children,
    },
};

export const WithIcon: StoryObj<typeof Dropdown> = {
    args: {
        label: <UserCircle />,
        buttonLabel: 'User dropdown button',
        children,
    },
};
