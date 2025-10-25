import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { DashboardPageContent } from '@/features/dashboard/components/DashboardPageContent';
import { useSchedulePeriods } from '@/features/dashboard/hooks/useSchedulePeriods';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import { CreateScheduleMultiStep } from '@/features/schedules/components/CreateScheduleMultiStep';
import { editSchedule } from '@/shared/constants/routes';

const InitialSetupPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('dashboard');
    const { schedule, lessonPeriods, isSchedulePeriodLoading } =
        useSchedulePeriods();

    useEffect(() => {
        if (schedule && lessonPeriods && lessonPeriods.length) {
            navigate(editSchedule(schedule.name));
        }
    }, [lessonPeriods]);

    if (isSchedulePeriodLoading) return <StyledLoading />;
    if (!lessonPeriods || lessonPeriods.length) return null;

    return (
        <DashboardPageContent title={t('Lesson periods')}>
            <CreateScheduleMultiStep currentStep={1} />
        </DashboardPageContent>
    );
};

export default InitialSetupPage;
