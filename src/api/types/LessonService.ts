import { Entity } from '@/api/types';
import { LessonType } from '@/api/types/LessonTypeService';
import { Subgroup } from '@/api/types/SubgroupService';
import { Teacher } from '@/api/types/TeacherService';

export type Lesson = Entity<{
    name: string;
    currentHours: number;
    amountOfHours: number;
    subgroups: Subgroup[];
    lessonType: LessonType;
    teacher: Teacher;
}>;
