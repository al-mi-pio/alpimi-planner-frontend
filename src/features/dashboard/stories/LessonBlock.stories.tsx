import type { Meta, StoryObj } from '@storybook/react';

import { LessonBlock } from '@/features/dashboard/components/LessonBlock';

export default {
    title: 'Features/Dashboard/Components/LessonBlock',
    component: LessonBlock,
} satisfies Meta<typeof LessonBlock>;

export const Default: StoryObj<typeof LessonBlock> = {
    args: {
        lesson: {
            name: 'Example lesson',
            color: 30,
        },
        classroom: {
            name: 'Class 001',
            status: 'normal',
        },
        teacher: {
            name: 'John',
            status: 'normal',
        },
        group: {
            name: 'G01',
            status: 'normal',
        },
    },
};

export const Warnings: StoryObj<typeof LessonBlock> = {
    args: {
        lesson: {
            name: 'Example lesson long name',
            color: 30,
        },
        classroom: {
            name: 'Class 001 the second',
            status: 'normal',
        },
        teacher: {
            name: 'John Paul II',
            status: 'warning',
        },
        group: {
            name: 'G01 G03-23a',
            status: 'error',
        },
    },
};
