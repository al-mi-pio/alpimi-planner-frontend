import {
    type UndefinedInitialDataOptions,
    useQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import type { ErrorResponse } from '@/api/types';
import { tokenExpirationUrl } from '@/shared/utils/url';

export const useGetData = <T = object,>(
    queryOptions: UndefinedInitialDataOptions<T>
) => {
    const queryState = useQuery({ retry: false, ...queryOptions });
    const navigate = useNavigate();
    const { t } = useTranslation('general');

    useEffect(() => {
        const result = queryState.error as ErrorResponse | AxiosError | 404;
        if (result)
            if (result === 404)
                toast.error(t('Storybook is not setup for mocking'));
            else if ('errors' in result)
                if (result.status === 401) {
                    localStorage.removeItem('accessToken');
                    navigate(tokenExpirationUrl());
                } else toast.error(result.errors[0].message);
            else toast.error(t(result.message));
    }, [queryState.error]);

    return queryState;
};
