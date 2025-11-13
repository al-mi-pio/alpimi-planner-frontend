import { useState } from 'react';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import {
    lessonBlockDelete,
    lessonBlockPatch,
    lessonBlockPost,
} from '@/api/services/lessonBlockService';
import type {
    DeleteResponse,
    ErrorMessage,
    ErrorResponse,
    ErrorsState,
    Id,
    PatchResponse,
    PostResponse,
} from '@/api/types';
import type {
    CreateLessonBlockDTO,
    PatchLessonBlockDTO,
} from '@/api/types/LessonBlockService';
import { getErrorsState } from '@/api/utils';
import { useMutateData } from '@/shared/hooks/useMutateData';

export interface UseMutateLessonBlockProps {
    onPostSuccess: (
        data: PostResponse,
        variables: CreateLessonBlockDTO
    ) => void;
    onDeleteSuccess: (_: DeleteResponse, variables: Id) => void;
    onPatchSuccess: (
        data: PatchResponse,
        variables: PatchLessonBlockDTO
    ) => void;
}

export const useMutateLessonBlock = ({
    onPostSuccess,
    onDeleteSuccess,
    onPatchSuccess,
}: UseMutateLessonBlockProps) => {
    const [errors, setErrors] = useState<ErrorsState<CreateLessonBlockDTO>>({});

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

    const resetErrors = (key?: keyof CreateLessonBlockDTO) =>
        setErrors(
            key
                ? (prev) => {
                      const { [key]: _, ...rest } = prev;
                      (() => _)();
                      return rest;
                  }
                : {}
        );

    const { isPending: isPostPending, mutate: post } = useMutateData({
        mutationFn: lessonBlockPost,
        onError,
        onSuccess: onPostSuccess,
    });

    const { isPending: isPatchPending, mutate: patch } = useMutateData({
        mutationFn: lessonBlockPatch,
        onError,
        onSuccess: onPatchSuccess,
    });

    const { isPending: isDeletePending, mutate: remove } = useMutateData({
        mutationFn: lessonBlockDelete,
        onError,
        onSuccess: onDeleteSuccess,
    });

    return {
        post,
        patch,
        remove,
        isPending: isPostPending || isPatchPending || isDeletePending,
        errors,
        resetErrors,
    };
};
