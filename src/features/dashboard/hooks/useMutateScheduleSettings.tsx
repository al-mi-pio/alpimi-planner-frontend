import { useState } from 'react';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import { scheduleSettingsPatch } from '@/api/services/scheduleSettingsService';
import type {
    ErrorMessage,
    ErrorResponse,
    ErrorsState,
    PatchResponse,
} from '@/api/types';
import type {
    PatchScheduleSettingsDTO,
    ScheduleSettings,
} from '@/api/types/ScheduleSettingsService';
import { getErrorsState } from '@/api/utils';
import { useMutateData } from '@/shared/hooks/useMutateData';

export interface UseMutateScheduleSettingsProps {
    onPatchSuccess: (
        data: PatchResponse,
        variables: PatchScheduleSettingsDTO
    ) => void;
}

export const useMutateScheduleSettings = ({
    onPatchSuccess,
}: UseMutateScheduleSettingsProps) => {
    const [errors, setErrors] = useState<ErrorsState<ScheduleSettings>>({});

    const onError = (response: ErrorResponse | AxiosError) => {
        if ('errors' in response) {
            const errorsWithField: ErrorMessage[] = [];
            response.errors.map((error) =>
                error.field
                    ? errorsWithField.push(error)
                    : toast.error(error.message)
            );
            setErrors(getErrorsState(errorsWithField));
        }
    };

    const resetErrors = (key?: keyof ScheduleSettings) =>
        setErrors(
            key
                ? (prev) => {
                      const { [key]: _, ...rest } = prev;
                      (() => _)();
                      return rest;
                  }
                : {}
        );

    const { isPending: isPatchPending, mutate: patch } = useMutateData({
        mutationFn: scheduleSettingsPatch,
        onError,
        onSuccess: onPatchSuccess,
    });

    return {
        patch,
        isPending: isPatchPending,
        errors,
        resetErrors,
    };
};
