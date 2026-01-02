import { useTranslation } from 'react-i18next';

import { getTeacherName } from '@/api/services/teacherService';
import type { LessonBlock as LessonBlockType } from '@/api/types/LessonBlockService';
import {
    Content,
    Row,
    Title,
    Wrapper,
} from '@/features/dashboard/styles/LessonBlock.style';
import P from '@/shared/components/P';

/**
 * Lesson block component for public view
 */
export const ReadOnlyLessonBlock = ({ data }: { data: LessonBlockType }) => {
    const { t } = useTranslation('dashboard');

    return (
        <Wrapper $hovered={false} $readOnly={true} id={data.id}>
            <Title $color={data.lesson.lessonType.color}>
                <P bold>{data.lesson.name}</P>
            </Title>

            <Content>
                <Row>
                    <P>{t('Classroom')}</P>

                    <P>{data.classroom ? data.classroom.name : t('None')}</P>
                </Row>

                <Row>
                    <P>{t('Teacher')}</P>

                    <P>{getTeacherName(data.lesson.teacher)}</P>
                </Row>

                <Row>
                    <P>
                        {t('Group', {
                            count: data.lesson.subgroups.length,
                        })}
                    </P>
                    {data.lesson.subgroups.length ? (
                        data.lesson.subgroups.map((subgroup, i) => (
                            <P key={subgroup.id}>
                                {subgroup.name +
                                    (i < data.lesson.subgroups.length - 1
                                        ? ', '
                                        : '')}
                            </P>
                        ))
                    ) : (
                        <P>{t('None')}</P>
                    )}
                </Row>
            </Content>
        </Wrapper>
    );
};
