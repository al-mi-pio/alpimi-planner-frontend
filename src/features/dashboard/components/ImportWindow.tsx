import { type ChangeEvent, type DragEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

export const ImportWindow = ({
    renderMultiStep,
}: {
    renderMultiStep?: boolean;
}) => {
    const { t } = useTranslation('dashboard');
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        if (files && files[0] && files[0].type === 'text/xml') {
            const file = files[0];
            const data = await file.text();
            // TODO
        }
        setIsLoading(false);
    };

    const handleDownload = async () => {
        setIsLoading(true);
        // TODO
        setIsLoading(false);
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
                {isLoading ? (
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
            <StyledWindow loading={isLoading}>
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
