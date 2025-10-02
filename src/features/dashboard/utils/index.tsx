import { LessonBlockProperty } from '@/features/dashboard/components/LessonBlock';
import ErrorSign from '@/shared/icons/ErrorSign';
import WarningSign from '@/shared/icons/WarningSign';

export const renderWarningIcon = ({ status }: LessonBlockProperty) =>
    status === 'warning' ? (
        <WarningSign />
    ) : status === 'error' ? (
        <ErrorSign />
    ) : null;
