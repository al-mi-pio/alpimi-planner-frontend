import type { Meta, StoryObj } from '@storybook/react';

import { Timetable } from '@/features/dashboard/components/Timetable';
import { getMockLessonBlockProps } from '@/features/dashboard/utils/mocks';

export default {
    title: 'Features/Dashboard/Components/Timetable',
    component: Timetable,
} satisfies Meta<typeof Timetable>;

export const Default: StoryObj<typeof Timetable> = {
    args: {
        lessonPeriods: [
            { id: '0-0-0-0-0', start: '08:00' },
            { id: '0-0-0-0-1', start: '09:00' },
            { id: '0-0-0-0-2', start: '12:30' },
        ],
        scheduleSettings: {
            id: '0-1-0-0-0',
            schoolHour: 45,
            schoolYearStart: '2025-10-01',
            schoolYearEnd: '2025-11-10',
            schoolDays: '1110000',
            isPublic: true,
        },
        lessonBlocks: {
            '0-0-cell': [getMockLessonBlockProps(9)],
            '0-1-cell': [
                getMockLessonBlockProps(10),
                getMockLessonBlockProps(15),
                getMockLessonBlockProps(16),
                getMockLessonBlockProps(17),
                getMockLessonBlockProps(18),
                getMockLessonBlockProps(11),
            ],
            '0-2-cell': [
                getMockLessonBlockProps(20),
                getMockLessonBlockProps(21),
            ],
            '1-1-cell': [
                getMockLessonBlockProps(10),
                getMockLessonBlockProps(11),
                getMockLessonBlockProps(12),
                getMockLessonBlockProps(13),
            ],
        },
    },
};
