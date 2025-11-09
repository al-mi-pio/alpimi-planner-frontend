import {
    type ComponentPropsWithRef,
    type DragEvent,
    use,
    useEffect,
    useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import { getTeacherName } from '@/api/services/teacherService';
import { EntityType } from '@/api/types';
import type { LessonBlock as LessonBlockType } from '@/api/types/LessonBlockService';
import {
    HoveredBlockIdContext,
    CurrentTimetableFiltersContext,
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
    const [, setCurrentTimetableFilters] = use(CurrentTimetableFiltersContext);
    const { setSelectedEntity } = usePropertiesWindow();

    const handleDragstart = (e: DragEvent) => {
        e.dataTransfer?.setData('text/plain', JSON.stringify(data));
    };

    useEffect(() => {
        if (
            hoveredBlockId === data.id &&
            ref.current?.closest('.lesson-block-folder') &&
            ref.current?.draggable
        )
            ref.current?.scrollIntoView();
    }, [hoveredBlockId]);

    return (
        <Wrapper
            {...defaultProps}
            ref={ref}
            $hovered={hoveredBlockId === data.id}
            id={data.id}
            draggable={defaultProps.draggable ?? true}
            onDragStart={handleDragstart}
            onClick={(e) => {
                if ((e.target as HTMLDivElement).tagName === 'BUTTON') return;
                setSelectedEntity({
                    id: data.id,
                    entity: EntityType.LessonBlock,
                });
            }}
        >
            <Title $color={data.lesson.lessonType.color}>
                {renderWarningIcon(statuses.lessonBlock)}
                <P bold>{data.lesson.name}</P>
            </Title>

            <Content>
                <Row>
                    <P>{t('Classroom')}</P>

                    {data.classroom ? (
                        <Clickable
                            onClick={() =>
                                setSelectedEntity(
                                    data.classroom && {
                                        id: data.classroom.id,
                                        entity: EntityType.Classroom,
                                    }
                                )
                            }
                            onDoubleClick={() =>
                                setCurrentTimetableFilters(
                                    (prev) =>
                                        prev &&
                                        data.classroom && {
                                            ...prev,
                                            entityName: data.classroom.name,
                                            entityId: data.classroom.id,
                                        }
                                )
                            }
                        >
                            {renderWarningIcon(statuses.classroom)}
                            {data.classroom.name}
                        </Clickable>
                    ) : (
                        <P>{t('None')}</P>
                    )}
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
                            setCurrentTimetableFilters(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        entityName: getTeacherName(
                                            data.lesson.teacher
                                        ),
                                        entityId: data.lesson.teacher.id,
                                    }
                            )
                        }
                    >
                        {renderWarningIcon(statuses.teacher)}
                        {getTeacherName(data.lesson.teacher)}
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
                                      setCurrentTimetableFilters(
                                          (prev) =>
                                              prev && {
                                                  ...prev,
                                                  entityName: subgroup.name,
                                                  entityId: subgroup.id,
                                              }
                                      )
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
