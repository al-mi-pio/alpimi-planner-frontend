import { Status } from '@/features/dashboard/types';
import ErrorSign from '@/shared/icons/ErrorSign';
import WarningSign from '@/shared/icons/WarningSign';

export const renderWarningIcon = (status: Status) =>
    status === Status.Warning ? (
        <WarningSign />
    ) : status === Status.Error ? (
        <ErrorSign />
    ) : null;
