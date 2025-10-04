import type { Meta, StoryObj } from '@storybook/react';

import { LessonBlock } from '@/features/dashboard/components/LessonBlock';
import { Status } from '@/features/dashboard/types';
import { getMockLessonBlockProps } from '@/features/dashboard/utils/mocks';

export default {
    title: 'Features/Dashboard/Components/LessonBlock',
    component: LessonBlock,
} satisfies Meta<typeof LessonBlock>;

export const Default: StoryObj<typeof LessonBlock> = {
    args: getMockLessonBlockProps(0),
};

export const Warnings: StoryObj<typeof LessonBlock> = {
    args: {
        ...getMockLessonBlockProps(0),
        statuses: {
            classroom: Status.Normal,
            teacher: Status.Warning,
            subgroups: Status.Error,
        },
    },
};
