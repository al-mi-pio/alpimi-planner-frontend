import { Entity } from '@/api/types';
import { Group } from '@/api/types/GroupService';
import { Lesson } from '@/api/types/LessonService';

export type Subgroup = Entity<{
    name: string;
    studentCount: number;
    lessons: Lesson[];
    group: Group;
}>;
