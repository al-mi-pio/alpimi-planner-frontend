import type { Teacher } from '@/api/types/TeacherService';

export const getTeacherName = (teacher: Teacher) =>
    `${teacher.name} ${teacher.surname}`;
