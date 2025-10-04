import { Entity, Id } from '@/api/types';
import { Classroom } from '@/api/types/ClassroomService';
import { Lesson } from '@/api/types/LessonService';

export type LessonBlock = Entity<{
    lessonDate: string;
    lessonStart: number;
    lessonEnd: number;
    lesson: Lesson;
    classroom: Classroom;
    clusterId: Id;
}>;
