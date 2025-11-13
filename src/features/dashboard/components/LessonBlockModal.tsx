import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classroomGetAll } from '@/api/services/classroomService';
import type { Id } from '@/api/types';
import type {
    CreateLessonBlockDTO,
    LessonBlock,
} from '@/api/types/LessonBlockService';
import type { ScheduleSettings } from '@/api/types/ScheduleSettingsService';
import { useLessonBlockForm } from '@/features/dashboard/hooks/useLessonBlockForm';
import { useMutateLessonBlock } from '@/features/dashboard/hooks/useMutateLessonBlock';
import { usePropertiesWindow } from '@/features/dashboard/hooks/usePropertiesWindow';
import {
    FormRow,
    ModalContent,
    StyledNumber,
} from '@/features/dashboard/styles/LessonBlockModal.style';
import { weekDaysFromSchoolDays } from '@/features/dashboard/utils';
import Button from '@/shared/components/Button';
import Checkbox from '@/shared/components/Checkbox';
import MessageBox from '@/shared/components/MessageBox';
import Modal from '@/shared/components/Modal';
import type { ModalProps } from '@/shared/components/Modal/Modal';
import P from '@/shared/components/P';
import Select from '@/shared/components/Select';
import { weekDays as allWeekDays } from '@/shared/constants/time';
import { useGetData } from '@/shared/hooks/useGetData';
import { MessageType } from '@/shared/types';
import { getAdjustedDay } from '@/shared/utils/date';
import { capitalize } from '@/shared/utils/string';

export interface ImportModalProps extends Omit<ModalProps, 'open'> {
    scheduleSettings: ScheduleSettings;
    modalType?: 'edit' | 'delete';
    scheduleId?: Id;
    onClose: () => void;
    data: LessonBlock;
}

export const LessonBlockModal = ({
    data,
    modalType,
    onClose,
    scheduleId,
    scheduleSettings,
    ...defaultProps
}: ImportModalProps) => {
    const { setSelectedEntity } = usePropertiesWindow();
    const { t } = useTranslation(['dashboard', 'fields', 'schedules']);
    const [sequential, setSequential] = useState(true);
    const weekDays = weekDaysFromSchoolDays(scheduleSettings.schoolDays);
    const isEditing = modalType === 'edit';
    const queryClient = useQueryClient();

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
        onClose();
    };
    const onPostSuccess = () => {
        onPatchSuccess();
    };
    const onDeleteSuccess = () => {
        onPatchSuccess();
        setSelectedEntity(null);
    };

    const { remove, patch, isPending, errors, resetErrors } =
        useMutateLessonBlock({
            onPatchSuccess,
            onDeleteSuccess,
            onPostSuccess,
        });

    const { binders, edit, isErrored } = useLessonBlockForm({
        initialData: {
            lessonStart: String(data.lessonStart + 1),
            lessonEnd: String(data.lessonEnd + 1),
            weekDay: {
                label: t(
                    capitalize(allWeekDays[getAdjustedDay(data.lessonDate)]),
                    {
                        ns: 'schedules',
                    }
                ),
                value: String(getAdjustedDay(data.lessonDate)),
            },
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
            open={!!modalType}
            onClose={onClose}
            title={
                isEditing
                    ? t('Editing lesson block')
                    : t('Deleting lesson block')
            }
            footer={
                <>
                    <Button
                        label={isEditing ? t('Edit') : t('Delete')}
                        disabled={isErrored || isPending || isClassroomLoading}
                        onClick={() => {
                            if (isEditing) {
                                edit(sequential ? data.clusterId : data.id)(
                                    patch
                                );
                            } else
                                remove(sequential ? data.clusterId : data.id);
                        }}
                    />
                    <Button
                        label={t('Cancel')}
                        appearance="secondary"
                        onClick={onClose}
                    />
                </>
            }
        >
            <ModalContent loading={isPending || isClassroomLoading}>
                {!!Object.keys(errors).length &&
                    Object.entries(errors).map(([field, error], i) => (
                        <MessageBox
                            key={i}
                            type={MessageType.error}
                            onClose={() =>
                                resetErrors(field as keyof CreateLessonBlockDTO)
                            }
                        >
                            {error}
                        </MessageBox>
                    ))}
                {!isEditing ? (
                    <>
                        <P>
                            {t(
                                'Do you really want to delete this lesson block'
                            )}
                        </P>
                    </>
                ) : (
                    <>
                        <Select
                            options={weekDays.map((day) => ({
                                label: t(capitalize(day), {
                                    ns: 'schedules',
                                }),
                                value: String(allWeekDays.indexOf(day)),
                            }))}
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
                                {...binders.lessonStart}
                            />
                            <StyledNumber
                                label={t('Lesson end', { ns: 'fields' })}
                                name="lessonEnd"
                                min={1}
                                {...binders.lessonEnd}
                            />
                        </FormRow>

                        <Select
                            options={[
                                { label: t('Select classroom'), value: '' },
                                ...(classrooms || []).map(({ id, name }) => ({
                                    label: name,
                                    value: id,
                                })),
                            ]}
                            isClearable={false}
                            label={t('Classroom', { ns: 'fields' })}
                            name="classroom"
                            {...binders.classroom}
                        />
                    </>
                )}
                <Checkbox
                    label={t('Apply for every lesson block in the sequence')}
                    name="sequential"
                    checked={sequential}
                    onChange={() => setSequential((prev) => !prev)}
                />
            </ModalContent>
        </Modal>
    );
};
