import type { Meta, StoryObj } from '@storybook/react';

import { LessonBlock } from '@/features/dashboard/components/LessonBlock';
import { PropertiesWindowProvider } from '@/features/dashboard/providers/PropertiesWindow';
import { Status } from '@/features/dashboard/types';
import { getMockLessonBlockProps } from '@/features/dashboard/utils/mocks';

export default {
    title: 'Features/Dashboard/Components/LessonBlock',
    component: LessonBlock,
    decorators: (Story) => (
        <PropertiesWindowProvider>
            <Story />
        </PropertiesWindowProvider>
    ),
} satisfies Meta<typeof LessonBlock>;

export const Default: StoryObj<typeof LessonBlock> = {
    args: getMockLessonBlockProps(0),
};

export const Warnings: StoryObj<typeof LessonBlock> = {
    args: {
        ...getMockLessonBlockProps(0),

        statuses: {
            classroom: Status.Error,
            teacher: Status.Warning,
            subgroups: {
                '1-0-0-0-0': Status.Warning,
                '2-0-0-0-0': Status.Error,
            },
        },
    },
};
