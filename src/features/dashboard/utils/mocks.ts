import type { LessonBlockProps } from '@/features/dashboard/components/LessonBlock';
import { Status } from '@/features/dashboard/types';

export const getMockLessonBlockProps = (id: number) =>
    ({
        statuses: {
            lessonBlock: Status.Normal,
            classroom: Status.Normal,
            teacher: Status.Normal,
            subgroups: {
                '1-0-0-0-0': Status.Normal,
                '2-0-0-0-0': Status.Normal,
            },
        },
        data: {
            id: `0-0-0-0-${id}`,
            lesson: {
                name: 'Lesson name',
                lessonType: {
                    color: 40,
                },
                teacher: {
                    name: 'Jack',
                    surname: 'Parsley',
                },
                subgroups: [
                    { id: '1-0-0-0-0', name: 'G01' },
                    { id: '2-0-0-0-0', name: 'G02' },
                ],
            },
            classroom: { name: 'Class D' },
        },
    }) as unknown as LessonBlockProps;
