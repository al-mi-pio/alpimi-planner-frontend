import type { Meta, StoryObj } from '@storybook/react';

import Select from '@/shared/components/Select';
import { selectOptionsMock } from '@/shared/components/Select/mocks';

export default {
    title: 'Shared/Components/Select',
    component: Select,
} satisfies Meta<typeof Select>;

export const Default: StoryObj<typeof Select> = {
    args: {
        label: 'Input label',
        options: selectOptionsMock,
    },
};

export const Multiselect: StoryObj<typeof Select> = {
    args: {
        label: 'Input label',
        isMulti: true,
        options: selectOptionsMock,
    },
};

export const WithError: StoryObj<typeof Select> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
        options: selectOptionsMock,
    },
};

export const MultiselectWithError: StoryObj<typeof Select> = {
    args: {
        label: 'Input label',
        error: 'Something went wrong',
        isMulti: true,
        options: selectOptionsMock,
    },
};

export const WithoutLabel: StoryObj<typeof Select> = {};
