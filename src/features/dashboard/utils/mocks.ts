import { LessonBlockProps } from '@/features/dashboard/components/LessonBlock';
import { Status } from '@/features/dashboard/types';

export const getMockLessonBlockProps = (id: number) =>
    ({
        statuses: {
            classroom: Status.Normal,
            teacher: Status.Normal,
            subgroups: Status.Normal,
        },
        data: {
            id: `0-0-0-0-${id}`,
            lesson: {
                name: 'Lesson name',
                lessonType: {
                    color: 40,
                },
                teacher: {
                    name: 'John',
                    surname: 'Paul',
                },
                subgroups: [{ name: 'G01' }],
            },
            classroom: { name: 'Class 001' },
        },
    }) as unknown as LessonBlockProps;
