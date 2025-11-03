import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { CreateLessonBlockDTO } from '@/api/types/LessonBlockService';
import { useMutateLessonBlock } from '@/features/dashboard/hooks/useMutateLessonBlock';
import { ModalContent } from '@/features/dashboard/styles/LessonBlockModal.style';
import type { DroppedLesson } from '@/features/dashboard/types';
import Button from '@/shared/components/Button';
import Checkbox from '@/shared/components/Checkbox';
import MessageBox from '@/shared/components/MessageBox';
import Modal from '@/shared/components/Modal';
import type { ModalProps } from '@/shared/components/Modal/Modal';
import { MessageType } from '@/shared/types';
import { adjustedDayToDto } from '@/shared/utils/date';

export interface ImportModalProps extends Omit<ModalProps, 'open'> {
    initialDataState: ReturnType<typeof useState<DroppedLesson>>;
}

export const LessonBlockDropModal = ({
    initialDataState: [initialData, setInitialData],
    ...defaultProps
}: ImportModalProps) => {
    const { t } = useTranslation('dashboard');
    const queryClient = useQueryClient();
    const [sequential, setSequential] = useState(true);
    const isMoving = !!initialData && !('lessonId' in initialData);
    const onSuccess = () => {
        queryClient
            .invalidateQueries({
                queryKey: ['lessonBlock'],
            })
            .then(() => {
                queryClient
                    .refetchQueries({
                        queryKey: ['lessonBlock'],
                    })
                    .then();
            });

        setInitialData(undefined);
    };
    const { post, patch, isPending, errors, resetErrors } =
        useMutateLessonBlock({
            onPatchSuccess: onSuccess,
            onDeleteSuccess: onSuccess,
            onPostSuccess: onSuccess,
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
                            disabled={!!Object.keys(errors).length || isPending}
                            onClick={async () => {
                                if (isMoving) {
                                    const { clusterId, id, ...dto } =
                                        initialData;
                                    patch({
                                        ...dto,
                                        weekDay: adjustedDayToDto(dto.weekDay),
                                        id: sequential ? clusterId : id,
                                    });
                                } // TODO: else post({...initialData,     });
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
                <ModalContent loading={isPending}>
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
                            checked={sequential}
                            onChange={() => setSequential((prev) => !prev)}
                        />
                    ) : (
                        <>{'TODO'}</>
                    )}
                </ModalContent>
            )}
        </Modal>
    );
};
