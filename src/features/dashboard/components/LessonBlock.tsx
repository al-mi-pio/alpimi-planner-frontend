import {
    ComponentPropsWithRef,
    DragEvent,
    use,
    useEffect,
    useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import { LessonBlock as LessonBlockType } from '@/api/types/LessonBlockService';
import { HoveredBlockIdContext } from '@/features/dashboard/contexts';
import {
    Content,
    Title,
    Wrapper,
    Row,
} from '@/features/dashboard/styles/LessonBlock.style';
import { Statuses } from '@/features/dashboard/types';
import { renderWarningIcon } from '@/features/dashboard/utils';
import P from '@/shared/components/P';

export interface LessonBlockProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    data: LessonBlockType;
    statuses: Statuses;
}

/**
 * Lesson block component
 */
export const LessonBlock = ({
    data,
    statuses,
    ...defaultProps
}: LessonBlockProps) => {
    const { t } = useTranslation('dashboard');
    const ref = useRef<HTMLDivElement>(null);
    const hoveredBlockId = use(HoveredBlockIdContext);

    const handleDragstart = (e: DragEvent) => {
        e.dataTransfer?.setData('text/plain', (e.target as HTMLDivElement).id);
    };

    useEffect(() => {
        if (hoveredBlockId === data.id) ref.current?.scrollIntoView();
    }, [hoveredBlockId]);

    return (
        <Wrapper
            {...defaultProps}
            ref={ref}
            $hovered={hoveredBlockId === data.id}
            id={data.id}
            draggable={defaultProps.draggable ?? true}
            onDragStart={handleDragstart}
        >
            <Title $color={data.lesson.lessonType.color}>
                <P bold>{data.lesson.name}</P>
            </Title>

            <Content>
                <Row>
                    {renderWarningIcon(statuses.classroom)}
                    <P>{t('Classroom: {{classroom.name}}', data)}</P>
                </Row>

                <Row>
                    {renderWarningIcon(statuses.teacher)}
                    <P>{t('Teacher: {{lesson.teacher.name}}', data)}</P>
                </Row>

                <Row>
                    {renderWarningIcon(statuses.subgroups)}
                    <P>
                        {t('Group: {{subgroups}}', {
                            count: data.lesson.subgroups.length,
                            subgroups: data.lesson.subgroups.length
                                ? data.lesson.subgroups
                                      .map((subgroup) => subgroup.name)
                                      .join(', ')
                                : t('None'),
                        })}
                    </P>
                </Row>
            </Content>
        </Wrapper>
    );
};
