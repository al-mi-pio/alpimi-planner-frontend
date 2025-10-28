import { useState } from 'react';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import {
    lessonPeriodDelete,
    lessonPeriodPost,
} from '@/api/services/lessonPeriodService';
import type {
    DeleteResponse,
    ErrorMessage,
    ErrorResponse,
    ErrorsState,
    Id,
    PostResponse,
} from '@/api/types';
import type { CreateLessonPeriodDTO } from '@/api/types/LessonPeriodService';
import { getErrorsState } from '@/api/utils';
import { useMutateData } from '@/shared/hooks/useMutateData';

export interface UseMutateLessonPeriodProps {
    onPostSuccess: (
        data: PostResponse,
        variables: CreateLessonPeriodDTO
    ) => void;
    onDeleteSuccess: (_: DeleteResponse, variables: Id) => void;
}

export const useMutateLessonPeriod = ({
    onPostSuccess,
    onDeleteSuccess,
}: UseMutateLessonPeriodProps) => {
    const [errors, setErrors] = useState<ErrorsState<CreateLessonPeriodDTO>>(
        {}
    );

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

    const resetErrors = () => setErrors({});

    const { isPending: isPostPending, mutate: post } = useMutateData({
        mutationFn: lessonPeriodPost,
        onError,
        onSuccess: onPostSuccess,
    });

    const { isPending: isDeletePending, mutate: remove } = useMutateData({
        mutationFn: lessonPeriodDelete,
        onError,
        onSuccess: onDeleteSuccess,
    });

    return {
        post,
        remove,
        isPending: isPostPending || isDeletePending,
        errors,
        resetErrors,
    };
};
