import {
    type ComponentPropsWithRef,
    type DragEvent,
    use,
    useEffect,
    useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import { EntityType } from '@/api/types';
import type { LessonBlock as LessonBlockType } from '@/api/types/LessonBlockService';
import {
    HoveredBlockIdContext,
    LessonBlockFiltersContext,
} from '@/features/dashboard/contexts';
import { usePropertiesWindow } from '@/features/dashboard/hooks/usePropertiesWindow';
import {
    Clickable,
    Content,
    Row,
    Title,
    Wrapper,
} from '@/features/dashboard/styles/LessonBlock.style';
import type { Statuses } from '@/features/dashboard/types';
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
    const [, setLessonBlockFilters] = use(LessonBlockFiltersContext);
    const { setSelectedEntity } = usePropertiesWindow();

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
                    <P>{t('Classroom')}</P>

                    <Clickable
                        onClick={() =>
                            setSelectedEntity({
                                id: data.classroom.id,
                                entity: EntityType.Classroom,
                            })
                        }
                        onDoubleClick={() =>
                            setLessonBlockFilters((prev) => ({
                                ...prev,
                                entityId: data.classroom.id,
                            }))
                        }
                    >
                        {renderWarningIcon(statuses.classroom)}
                        {data.classroom.name}
                    </Clickable>
                </Row>

                <Row>
                    <P>{t('Teacher')}</P>

                    <Clickable
                        onClick={() =>
                            setSelectedEntity({
                                id: data.lesson.teacher.id,
                                entity: EntityType.Teacher,
                            })
                        }
                        onDoubleClick={() =>
                            setLessonBlockFilters((prev) => ({
                                ...prev,
                                entityId: data.lesson.teacher.id,
                            }))
                        }
                    >
                        {renderWarningIcon(statuses.teacher)}
                        {`${data.lesson.teacher.name} ${data.lesson.teacher.surname}`}
                    </Clickable>
                </Row>

                <Row>
                    <P>
                        {t('Group', {
                            count: data.lesson.subgroups.length,
                        })}
                    </P>
                    {data.lesson.subgroups.length
                        ? data.lesson.subgroups.map((subgroup) => (
                              <Clickable
                                  key={subgroup.id}
                                  onClick={() =>
                                      setSelectedEntity({
                                          id: subgroup.id,
                                          entity: EntityType.Subgroup,
                                      })
                                  }
                                  onDoubleClick={() =>
                                      setLessonBlockFilters((prev) => ({
                                          ...prev,
                                          entityId: subgroup.id,
                                      }))
                                  }
                              >
                                  {renderWarningIcon(
                                      statuses.subgroups[subgroup.id]
                                  )}
                                  {subgroup.name}
                              </Clickable>
                          ))
                        : t('None')}
                </Row>
            </Content>
        </Wrapper>
    );
};
