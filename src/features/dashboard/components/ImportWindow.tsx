import { type ChangeEvent, type DragEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { exportGet, importPost } from '@/api/services/dataService';
import type { ImportResponse } from '@/api/types/DataService';
import type { Schedule } from '@/api/types/ScheduleService';
import {
    ImportSection,
    MultiStepWrapper,
    StyledWindow,
} from '@/features/dashboard/styles/ImportWindow.style';
import { Loading } from '@/features/main/components/Loading';
import { CreateScheduleMultiStep } from '@/features/schedules/components/CreateScheduleMultiStep';
import Button from '@/shared/components/Button';
import H from '@/shared/components/H';
import Modal from '@/shared/components/Modal';
import P from '@/shared/components/P';
import Upload from '@/shared/components/Upload';
import { useGetData } from '@/shared/hooks/useGetData';
import { useMutateData } from '@/shared/hooks/useMutateData';
import { getFilenameDate } from '@/shared/utils/date';
import { createFile, downloadFile } from '@/shared/utils/file';

export const ImportWindow = ({
    renderMultiStep,
    schedule,
}: {
    renderMultiStep?: boolean;
    schedule: Schedule;
}) => {
    const { t } = useTranslation('dashboard');
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [isImportLoading, setisImportLoading] = useState(false);
    const [isExportPending, setIsExportPending] = useState(false);
    const [modalContent, setModalContent] =
        useState<ImportResponse['content']>();

    const { data: exportPayload, isLoading: isExportLoading } = useGetData({
        queryKey: ['export', schedule.id],
        queryFn: () => exportGet(schedule.id),
        select: (data) => data.content.payload,
        enabled: isExportPending,
    });

    const onImportSuccess = ({ content }: ImportResponse) => {
        setModalContent(content);
    };

    const { isPending: isImportPending, mutate: upload } = useMutateData({
        mutationFn: importPost,
        onSuccess: onImportSuccess,
    });

    useEffect(() => {
        if (!isExportLoading && isExportPending) {
            if (exportPayload) {
                const file = createFile(
                    `Alpimi_${schedule.name}_${getFilenameDate()}.xml`,
                    'text/xml',
                    exportPayload
                );
                downloadFile(file);
            }

            setIsExportPending(false);
        }
    }, [exportPayload, isExportLoading, isExportPending]);

    const handleDragover = (e: DragEvent<HTMLDivElement>) => {
        if (
            e.dataTransfer.items &&
            e.dataTransfer.items[0] &&
            e.dataTransfer.items[0].type === 'text/xml'
        ) {
            e.preventDefault();
            setIsDraggedOver(true);
        }
    };

    const handleUpload = async (files?: FileList | null) => {
        setIsDraggedOver(false);
        setisImportLoading(true);
        if (files && files[0] && files[0].type === 'text/xml') {
            const file = files[0];
            const payload = await file.text();
            upload({ scheduleId: schedule.id, payload });
        }
        setisImportLoading(false);
    };

    const handleDownload = async () => {
        setIsExportPending(true);
    };

    const handleDragleave = () => {
        setIsDraggedOver(false);
    };

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        await handleUpload(e.dataTransfer.files);
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        await handleUpload(e.target.files);
    };

    return (
        <div>
            <MultiStepWrapper>
                {isImportLoading || isImportPending || isExportPending ? (
                    <>
                        <Loading />
                        <P>{t('Please wait...')}</P>
                    </>
                ) : (
                    renderMultiStep && (
                        <CreateScheduleMultiStep currentStep={2} />
                    )
                )}
            </MultiStepWrapper>
            <StyledWindow
                loading={isImportLoading || isImportPending || isExportPending}
            >
                <ImportSection>
                    <H level={2}>{t('Import')}</H>
                    <Upload
                        label={t('XML file')}
                        accept="text/xml"
                        onChange={handleChange}
                        dropzoneProps={{
                            onDragOver: handleDragover,
                            onDrop: handleDrop,
                            onDragLeave: handleDragleave,
                            $isDraggedOver: isDraggedOver,
                        }}
                    />
                </ImportSection>
                <H level={3}>{t('or')}</H>
                <ImportSection>
                    <H level={2}>{t('Export data')}</H>
                    <Button
                        label={t('Download XML file')}
                        appearance="secondary"
                        onClick={handleDownload}
                    />
                </ImportSection>
            </StyledWindow>
            <Modal
                open={!!modalContent}
                title={t('Import result')}
                onClose={() => setModalContent(undefined)}
            >
                {JSON.stringify(modalContent)}
                {/*TODO: pretty display*/}
            </Modal>
        </div>
    );
};
