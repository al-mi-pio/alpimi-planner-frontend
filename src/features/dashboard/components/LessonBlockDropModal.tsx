import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classroomGetAll } from '@/api/services/classroomService';
import type { Id } from '@/api/types';
import type { CreateLessonBlockDTO } from '@/api/types/LessonBlockService';
import { useLessonBlockForm } from '@/features/dashboard/hooks/useLessonBlockForm';
import { useMutateLessonBlock } from '@/features/dashboard/hooks/useMutateLessonBlock';
import {
    FormRow,
    ModalContent,
    StyledNumber,
} from '@/features/dashboard/styles/LessonBlockModal.style';
import type { DroppedLesson } from '@/features/dashboard/types';
import Button from '@/shared/components/Button';
import Checkbox from '@/shared/components/Checkbox';
import MessageBox from '@/shared/components/MessageBox';
import Modal from '@/shared/components/Modal';
import type { ModalProps } from '@/shared/components/Modal/Modal';
import P from '@/shared/components/P';
import Select from '@/shared/components/Select';
import { WeekDay, weekDays as allWeekDays } from '@/shared/constants/time';
import { useGetData } from '@/shared/hooks/useGetData';
import { MessageType } from '@/shared/types';
import { adjustedDayToDto } from '@/shared/utils/date';
import { capitalize } from '@/shared/utils/string';

export interface ImportModalProps extends Omit<ModalProps, 'open'> {
    initialDataState: ReturnType<typeof useState<DroppedLesson>>;
    scheduleId?: Id;
    weekDays: WeekDay[];
}

export const LessonBlockDropModal = ({
    initialDataState: [initialData, setInitialData],
    scheduleId,
    weekDays,
    ...defaultProps
}: ImportModalProps) => {
    const { t } = useTranslation(['dashboard', 'fields', 'schedules']);
    const queryClient = useQueryClient();
    const [sequential, setSequential] = useState(true);
    const isMoving = !!initialData && !('lessonId' in initialData);

    const refreshQuery = async () => {
        await queryClient.invalidateQueries({
            queryKey: ['lesson'],
        });
        await queryClient.refetchQueries({
            queryKey: ['lesson'],
        });
        await queryClient.invalidateQueries({
            queryKey: ['lessonBlock'],
        });
        await queryClient.refetchQueries({
            queryKey: ['lessonBlock'],
        });
    };

    const onPatchSuccess = () => {
        refreshQuery().then();
        setInitialData(undefined);
    };
    const onPostSuccess = () => {
        onPatchSuccess();
    };
    const onDeleteSuccess = () => {
        onPatchSuccess();
    };
    const { post, patch, isPending, errors, resetErrors } =
        useMutateLessonBlock({
            onPatchSuccess,
            onDeleteSuccess,
            onPostSuccess,
        });
    const { binders, submit, isErrored } = useLessonBlockForm({
        initialData: initialData && {
            ...initialData,
            lessonStart: String(initialData.lessonStart + 1),
            lessonEnd: String(initialData.lessonEnd + 1),
            weekDay: {
                label: t(capitalize(allWeekDays[initialData.weekDay]), {
                    ns: 'schedules',
                }),
                value: String(initialData.weekDay),
            },
            lesson:
                'lessonId' in initialData
                    ? { label: t('Lesson chosen'), value: initialData.lessonId }
                    : { label: t('Select lesson'), value: '' },
        },
        errors,
    });

    const { data: classrooms, isLoading: isClassroomLoading } = useGetData({
        queryKey: ['classroom', scheduleId],
        queryFn: () =>
            classroomGetAll({
                params: {
                    id: scheduleId || '0-0-0-0-0',
                },
            }),
        select: (data) => data.content,
        enabled: !!scheduleId,
    });

    return (
        <Modal
            {...defaultProps}
            open={!!initialData}
            onClose={() => setInitialData(undefined)}
            title={
                isMoving ? t('Moving lesson block') : t('Creating lesson block')
            }
            footer={
                initialData && (
                    <>
                        <Button
                            label={isMoving ? t('Move') : t('Create')}
                            disabled={
                                isErrored || isPending || isClassroomLoading
                            }
                            onClick={() => {
                                if (isMoving) {
                                    const { clusterId, id, ...dto } =
                                        initialData;
                                    patch({
                                        ...dto,
                                        weekDay: adjustedDayToDto(dto.weekDay),
                                        id: sequential ? clusterId : id,
                                    });
                                } else submit(post);
                            }}
                        />
                        <Button
                            label={t('Cancel')}
                            appearance="secondary"
                            onClick={() => setInitialData(undefined)}
                        />
                    </>
                )
            }
        >
            {initialData && (
                <ModalContent loading={isPending || isClassroomLoading}>
                    {!!Object.keys(errors).length &&
                        Object.entries(errors).map(([field, error], i) => (
                            <MessageBox
                                key={i}
                                type={MessageType.error}
                                onClose={() =>
                                    resetErrors(
                                        field as keyof CreateLessonBlockDTO
                                    )
                                }
                            >
                                {error}
                            </MessageBox>
                        ))}
                    {isMoving ? (
                        <Checkbox
                            label={t(
                                'Change every lesson block in the sequence'
                            )}
                            name="sequential"
                            checked={sequential}
                            onChange={() => setSequential((prev) => !prev)}
                        />
                    ) : (
                        <>
                            <Select
                                options={[
                                    {
                                        label: t('Lesson chosen'),
                                        value: initialData.lessonId,
                                    },
                                ]}
                                isDisabled
                                isClearable={false}
                                label={t('Lesson', { ns: 'fields' })}
                                name="lesson"
                                {...binders.lesson}
                            />

                            <Select
                                options={weekDays.map((day) => ({
                                    label: t(capitalize(day), {
                                        ns: 'schedules',
                                    }),
                                    value: String(allWeekDays.indexOf(day)),
                                }))}
                                isDisabled
                                isClearable={false}
                                label={t('Week day', { ns: 'fields' })}
                                name="weekDay"
                                {...binders.weekDay}
                            />

                            <FormRow>
                                <StyledNumber
                                    size={2}
                                    label={t('Lesson start', { ns: 'fields' })}
                                    name="lessonStart"
                                    min={1}
                                    disabled
                                    {...binders.lessonStart}
                                />
                                <StyledNumber
                                    label={t('Lesson end', { ns: 'fields' })}
                                    name="lessonEnd"
                                    min={1}
                                    disabled
                                    {...binders.lessonEnd}
                                />
                            </FormRow>

                            <Select
                                options={[
                                    { label: t('Select classroom'), value: '' },
                                    ...(classrooms || []).map(
                                        ({ id, name }) => ({
                                            label: name,
                                            value: id,
                                        })
                                    ),
                                ]}
                                isClearable={false}
                                label={t('Classroom', { ns: 'fields' })}
                                name="classroom"
                                {...binders.classroom}
                            />

                            <FormRow>
                                <Checkbox
                                    label={t('Repeat')}
                                    name="interval"
                                    {...binders.interval}
                                />
                                {binders.interval.checked && (
                                    <>
                                        <P>{t('every')}</P>
                                        <StyledNumber
                                            label={t('Week interval', {
                                                ns: 'fields',
                                            })}
                                            name="weekInterval"
                                            min={1}
                                            {...binders.weekInterval}
                                        />
                                        <P>
                                            {t('week', {
                                                count: Number(
                                                    binders.weekInterval.value
                                                ),
                                            })}
                                        </P>
                                    </>
                                )}
                            </FormRow>
                        </>
                    )}
                </ModalContent>
            )}
        </Modal>
    );
};
