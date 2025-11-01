import { useQuery } from '@tanstack/react-query';
import { type ChangeEvent, type DragEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { exportGet } from '@/api/services/dataService';
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
import P from '@/shared/components/P';
import Upload from '@/shared/components/Upload';
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

    const {
        data: exportPayload,
        isLoading: isExportLoading,
        error: exportError,
    } = useQuery({
        queryKey: ['export', schedule.id],
        queryFn: () => exportGet(schedule.id),
        select: (data) => data.content.payload,
        enabled: isExportPending,
    });

    useEffect(() => {
        if (!isExportLoading) {
            if (exportPayload) {
                const file = createFile(
                    `Alpimi_${schedule.name}_${getFilenameDate()}.xml`,
                    'text/xml',
                    exportPayload
                );
                downloadFile(file);
                setIsExportPending(false);
            }
            if (exportError) {
                setIsExportPending(false);
            }
        }
    }, [exportPayload, isExportLoading, exportError]);

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
            const data = await file.text();
            // TODO
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
                {isImportLoading || isExportPending ? (
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
            <StyledWindow loading={isImportLoading || isExportPending}>
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
        </div>
    );
};
