import { Meta, StoryObj } from '@storybook/react';

import { ScheduleBlock } from '@/features/schedules/components/ScheduleBlock';

export default {
    title: 'Features/Schedules/Components/ScheduleBlock',
    component: ScheduleBlock,
    argTypes: {
        modifyDate: {
            control: 'text',
        },
    },
} satisfies Meta<typeof ScheduleBlock>;

export const Default: StoryObj<typeof ScheduleBlock> = {
    args: {
        name: 'Summer 2024/25',
        modifyDate: '2025-08-20T21:15:00+02:00',
    },
};

export const LongName: StoryObj<typeof ScheduleBlock> = {
    args: {
        name: 'Summer 2024/25 really long schedule name',
        modifyDate: '2025-08-12T19:00:00+00:00',
    },
};

export const NoDate: StoryObj<typeof ScheduleBlock> = {
    args: {
        name: 'No date',
    },
};

export const NoName: StoryObj<typeof ScheduleBlock> = {};
