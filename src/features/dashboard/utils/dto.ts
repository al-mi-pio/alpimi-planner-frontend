import type { Id } from '@/api/types';
import type { LessonBlockForm } from '@/features/dashboard/types';
import { addDaysToDate } from '@/shared/utils/date';

export const lessonBlockFormToDTO = (
    form: LessonBlockForm,
    fromDate: string
) => ({
    lessonDate: addDaysToDate(fromDate, Number(form.weekDay.value)),
    lessonStart: Number(form.lessonStart) - 1,
    lessonEnd: Number(form.lessonEnd) - 1,
    lessonId: form.lesson.value as Id,
    classroomId: (form.classroom.value as Id) || null,
    weekInterval: form.interval ? Number(form.weekInterval) : null,
});
