import type { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { DataEntityType } from '@/api/types';
import type { ImportResponse } from '@/api/types/DataService';
import { ENTITY_LOCALES_MAP } from '@/features/dashboard/constants';
import { ModalContent } from '@/features/dashboard/styles/ImportModal.style';
import Button from '@/shared/components/Button';
import MessageBox from '@/shared/components/MessageBox';
import Modal from '@/shared/components/Modal';
import type { ModalProps } from '@/shared/components/Modal/Modal';
import P from '@/shared/components/P';
import { MessageType } from '@/shared/types';

export interface ImportModalProps extends Omit<ModalProps, 'open'> {
    modalState: ReturnType<typeof useState<ImportResponse['content']>>;
}

export const ImportModal = ({
    modalState: [modalContent, setModalContent],
    ...defaultProps
}: ImportModalProps) => {
    const { t } = useTranslation('dashboard');
    return (
        <Modal
            {...defaultProps}
            open={!!modalContent}
            onClose={() => setModalContent(undefined)}
            title={t('Import result')}
            footer={
                <Button
                    label={t('OK')}
                    appearance="secondary"
                    onClick={() => setModalContent(undefined)}
                />
            }
        >
            {modalContent && (
                <ModalContent>
                    <MessageBox type={MessageType.success} noClosing>
                        {t('Successfully imported {{count}} rows of data', {
                            count: modalContent.successfulItems,
                        })}
                    </MessageBox>
                    {!!Object.keys(modalContent.unsuccessfulItems).length && (
                        <>
                            <MessageBox type={MessageType.error} noClosing>
                                {t('Failed to import {{count}} rows', {
                                    count: Object.keys(
                                        modalContent.unsuccessfulItems
                                    ).length,
                                })}
                            </MessageBox>
                            <ul>
                                {Object.entries(
                                    modalContent.unsuccessfulItems
                                ).map(([entity, rows]) => (
                                    <li key={entity}>
                                        <P bold>
                                            {
                                                ENTITY_LOCALES_MAP(t)[
                                                    entity as DataEntityType
                                                ]
                                            }
                                        </P>
                                        <ul>
                                            {rows.map(
                                                ({ rowIndex, reason }) => (
                                                    <li key={rowIndex}>
                                                        <P>
                                                            {t(
                                                                'Row {{rowIndex}}: {{reasons}}',
                                                                {
                                                                    rowIndex,
                                                                    reasons:
                                                                        reason.map(
                                                                            (
                                                                                err
                                                                            ) =>
                                                                                err.message
                                                                        ),
                                                                }
                                                            )}
                                                        </P>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </ModalContent>
            )}
        </Modal>
    );
};
