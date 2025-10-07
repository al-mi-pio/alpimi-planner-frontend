import type { Entity } from '@/api/types';
import type { LessonType } from '@/api/types/LessonTypeService';
import type { Subgroup } from '@/api/types/SubgroupService';
import type { Teacher } from '@/api/types/TeacherService';

export type Lesson = Entity<{
    name: string;
    currentHours: number;
    amountOfHours: number;
    subgroups: Subgroup[];
    lessonType: LessonType;
    teacher: Teacher;
}>;
