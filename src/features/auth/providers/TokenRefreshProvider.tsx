import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { AxiosError } from 'axios';

import { authRefresh } from '@/api/services/authService';
import { ErrorResponse } from '@/api/types';
import { ReconnectModal } from '@/features/main/components/ReconnectModal';
import LoadingBox from '@/shared/components/LoadingBox';
import { tokenRefreshFrequency } from '@/shared/constants/configuration';
import { tokenExpirationUrl } from '@/shared/utils/url';

export const TokenRefreshProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const { isPending, error, data, failureCount, failureReason } = useQuery({
        queryKey: ['token'],
        queryFn: authRefresh,
        retry: true,
        retryDelay: 1000,
        refetchInterval: tokenRefreshFrequency,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        const result = (error ?? failureReason) as
            | ErrorResponse
            | AxiosError
            | 404;
        if (result && result !== 404)
            if ('errors' in result && result.status === 401) {
                localStorage.removeItem('accessToken');
                navigate(tokenExpirationUrl());
            }
    }, [error, failureReason]);

    useEffect(() => {
        if (data) localStorage.setItem('accessToken', data.content);
    }, [data]);

    return (
        <LoadingBox loading={isPending}>
            {!!failureCount && <ReconnectModal />}
            {children}
        </LoadingBox>
    );
};
