import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import type { DefaultError } from '@tanstack/query-core';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@/api/types';
import { tokenExpirationUrl } from '@/shared/constants/routes';

export const useMutateData = <
    TData = unknown,
    TError = DefaultError,
    TVariables = void,
    TContext = unknown,
>(
    mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
    const navigate = useNavigate();
    const { t } = useTranslation('general');
    const handleError = (
        error: TError,
        variables: TVariables,
        context?: TContext
    ) => {
        const result = error as ErrorResponse | AxiosError;
        if (result)
            if ('errors' in result) {
                if (result.status === 401) navigate(tokenExpirationUrl);
            } else toast.error(t(result.message));

        if (mutationOptions.onError)
            mutationOptions.onError(error, variables, context);
    };

    return useMutation({
        retry: false,
        ...mutationOptions,
        onError: handleError,
    });
};
