import { type AxiosResponse, type AxiosRequestConfig, AxiosError } from 'axios';

import type { ErrorMessage, ErrorResponse } from '@/api/types';
import i18n from '@/i18n';

export const parseAxiosResponse = <T>({ data, status }: AxiosResponse<T>) => ({
    ...data,
    status,
});

export const getDefaultConfig = (config?: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': i18n.language,
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            ...config?.headers,
        },
    };
};

export const catchApiErrors = (error: ErrorResponse | AxiosError) => {
    if ('response' in error && error.response) throw error.response.data;
    throw error;
};

export const getErrorsState = (errors: ErrorMessage[]) =>
    errors.reduce(
        (prev, curr) =>
            curr.field ? { ...prev, [curr.field]: curr.message } : prev,
        {}
    );
