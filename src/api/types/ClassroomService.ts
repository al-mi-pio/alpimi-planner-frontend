import type { Entity } from '@/api/types';
import type { ClassroomType } from '@/api/types/ClassroomTypeService';

export type Classroom = Entity<{
    name: string;
    capacity: number;
    classroomTypes: ClassroomType[];
}>;
