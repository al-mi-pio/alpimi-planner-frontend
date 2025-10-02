import { ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Content,
    Title,
    Wrapper,
    Row,
} from '@/features/dashboard/styles/LessonBlock.style';
import { renderWarningIcon } from '@/features/dashboard/utils';
import P from '@/shared/components/P';

export interface LessonBlockProperty {
    name: string;
    status: 'normal' | 'warning' | 'error';
}

export interface LessonType {
    name: string;
    color: number;
}

export interface LessonBlockProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    lesson: LessonType;
    classroom?: LessonBlockProperty;
    teacher?: LessonBlockProperty;
    group?: LessonBlockProperty;
}

/**
 * Lesson block component
 */
export const LessonBlock = ({
    lesson,
    classroom,
    teacher,
    group,
    ...defaultProps
}: LessonBlockProps) => {
    const { t } = useTranslation('dashboard');

    return (
        <Wrapper {...defaultProps}>
            <Title $color={lesson.color}>
                <P bold>{lesson.name}</P>
            </Title>

            <Content>
                {classroom && (
                    <Row>
                        {renderWarningIcon(classroom)}
                        <P>
                            {t('Classroom: {{classroom.name}}', { classroom })}
                        </P>
                    </Row>
                )}
                {teacher && (
                    <Row>
                        {renderWarningIcon(teacher)}
                        <P>{t('Teacher: {{teacher.name}}', { teacher })}</P>
                    </Row>
                )}
                {group && (
                    <Row>
                        {renderWarningIcon(group)}
                        <P>{t('Group: {{group.name}}', { group })}</P>
                    </Row>
                )}
            </Content>
        </Wrapper>
    );
};
