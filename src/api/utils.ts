import { AxiosResponse, AxiosRequestConfig } from 'axios';

export const parseAxiosResponse = <T>({ data, status }: AxiosResponse<T>) => ({
    ...data,
    status,
});

export const getDefaultConfig = (config?: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
        ...config,
    };
};
