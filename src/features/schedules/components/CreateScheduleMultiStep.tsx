import { useTranslation } from 'react-i18next';

import { StyledMultiStep } from '@/features/schedules/styles/CreateScheduleMultiStep.style';

export const CreateScheduleMultiStep = ({
    currentStep,
}: {
    currentStep?: number;
}) => {
    const { t } = useTranslation('schedules');
    const steps = [
        t('Create new schedule'),
        t('Add lesson periods'),
        t('Import or add data'),
    ];
    return <StyledMultiStep currentStep={currentStep} steps={steps} />;
};
