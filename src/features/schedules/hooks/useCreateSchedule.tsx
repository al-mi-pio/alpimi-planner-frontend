import { useState } from 'react';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import { schedulePost } from '@/api/services/scheduleService';
import type { ErrorMessage, ErrorResponse, ErrorsState } from '@/api/types';
import type { CreateScheduleDTO } from '@/api/types/ScheduleService';
import { getErrorsState } from '@/api/utils';
import { useMutateData } from '@/shared/hooks/useMutateData';

export const useCreateSchedule = ({ onSuccess }: { onSuccess: () => void }) => {
    const [errors, setErrors] = useState<ErrorsState<CreateScheduleDTO>>({});

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

    const { isPending, mutate } = useMutateData({
        mutationFn: schedulePost,
        onError,
        onSuccess,
    });

    return { post: mutate, isPending, errors };
};
