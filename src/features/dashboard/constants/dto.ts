import type { TFunction } from 'i18next';

import type { LessonBlockForm } from '@/features/dashboard/types';

export const getDefaultLessonBlockForm = (t: TFunction): LessonBlockForm => ({
    weekDay: { label: t('Select week day', { ns: 'dashboard' }), value: '-1' },
    lessonStart: '1',
    lessonEnd: '1',
    lesson: { label: t('Select lesson', { ns: 'dashboard' }), value: '' },
    classroom: { label: t('Select classroom', { ns: 'dashboard' }), value: '' },
    interval: true,
    weekInterval: '1',
});
