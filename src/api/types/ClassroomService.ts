import { Entity } from '@/api/types';
import { ClassroomType } from '@/api/types/ClassroomTypeService';

export type Classroom = Entity<{
    name: string;
    capacity: number;
    classroomTypes: ClassroomType[];
}>;
