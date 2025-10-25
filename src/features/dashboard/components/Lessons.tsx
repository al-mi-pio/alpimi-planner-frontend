import { useTranslation } from 'react-i18next';

import type { Lesson } from '@/api/types/LessonService';
import { LessonTile } from '@/features/dashboard/components/LessonTile';
import { CenterMessageWrapper } from '@/features/dashboard/styles/CollisionsTable.style';
import {
    LessonsWrapper,
    ScrollableLessons,
} from '@/features/dashboard/styles/Lessons.style';
import P from '@/shared/components/P';
import Search from '@/shared/components/Search';
import { useSearch } from '@/shared/hooks/useSearch';

export const Lessons = ({ lessons }: { lessons: Lesson[] }) => {
    const { t } = useTranslation('dashboard');
    const { filteredData, bindSearch } = useSearch({
        data: lessons,
        filterKey: 'name',
    });

    if (!lessons.length) {
        return (
            <CenterMessageWrapper>
                <P>{t('No lessons')}</P>
            </CenterMessageWrapper>
        );
    }

    return (
        <LessonsWrapper>
            <Search {...bindSearch} />
            <ScrollableLessons>
                {!filteredData.length && (
                    <CenterMessageWrapper>
                        <P>{t('No lessons found')}</P>
                    </CenterMessageWrapper>
                )}
                {filteredData.map((lesson) => (
                    <LessonTile key={lesson.id} {...lesson} />
                ))}
            </ScrollableLessons>
        </LessonsWrapper>
    );
};
