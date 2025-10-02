import ErrorSign from '@/shared/icons/ErrorSign';
import WarningSign from '@/shared/icons/WarningSign';
import { LessonBlockProperty } from '@/features/dashboard/components/LessonBlock';

export const renderWarningIcon = ({ status }: LessonBlockProperty) =>
    status === 'warning' ? (
        <WarningSign />
    ) : status === 'error' ? (
        <ErrorSign />
    ) : null;
