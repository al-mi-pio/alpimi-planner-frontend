import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { AxiosError } from 'axios';

import { authRefresh } from '@/api/services/authService';
import { ErrorResponse } from '@/api/types';
import LoadingBox from '@/shared/components/LoadingBox';
import Modal from '@/shared/components/Modal';
import { tokenRefreshFrequency } from '@/shared/constants/configuration';
import { tokenExpirationUrl } from '@/shared/utils/url';

export const TokenRefreshProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('general');
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
            <Modal open={!!failureCount} title={t('Network Error')}>
                {t('Trying to reconnect...')}
            </Modal>
            {children}
        </LoadingBox>
    );
};
