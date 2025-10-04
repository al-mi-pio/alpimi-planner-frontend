import { Entity } from '@/api/types';

export type LessonType = Entity<{
    name: string;
    color: number;
}>;
