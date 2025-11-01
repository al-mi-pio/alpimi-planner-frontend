import { useTranslation } from 'react-i18next';

import {
    ImportSection,
    MultiStepWrapper,
    StyledWindow,
} from '@/features/dashboard/styles/ImportWindow.style';
import { CreateScheduleMultiStep } from '@/features/schedules/components/CreateScheduleMultiStep';
import Button from '@/shared/components/Button';
import H from '@/shared/components/H';
import Upload from '@/shared/components/Upload';

export const ImportWindow = ({
    renderMultiStep,
}: {
    renderMultiStep?: boolean;
}) => {
    const { t } = useTranslation('dashboard');
    return (
        <div>
            <MultiStepWrapper>
                {renderMultiStep && <CreateScheduleMultiStep currentStep={2} />}
            </MultiStepWrapper>
            <StyledWindow>
                <ImportSection>
                    <H level={2}>{t('Import')}</H>
                    <Upload label={t('XML file')} />
                </ImportSection>
                <H level={3}>{t('or')}</H>
                <ImportSection>
                    <H level={2}>{t('Export data')}</H>
                    <Button
                        label={t('Download XML file')}
                        appearance="secondary"
                    />
                </ImportSection>
            </StyledWindow>
        </div>
    );
};
