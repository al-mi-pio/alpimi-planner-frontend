import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import { ErrorResponse } from '@/api/types';
import { login } from '@/shared/constants/routes';

export const useGetData = <T = object,>(
    queryOptions: UndefinedInitialDataOptions<T>
) => {
    const queryState = useQuery({ retry: false, ...queryOptions });
    const navigate = useNavigate();
    const { t } = useTranslation('general');

    useEffect(() => {
        const result = queryState.error as ErrorResponse | AxiosError;
        if (result)
            if ('errors' in result)
                if (result.status === 401)
                    navigate({
                        pathname: login,
                        search:
                            '?redirect=' +
                            encodeURIComponent(
                                location.search
                                    ? location.pathname + '?' + location.search
                                    : location.pathname
                            ),
                    });
                else toast.error(result.errors[0].message);
            else toast.error(t(result.message));
    }, [queryState.error]);

    return queryState;
};
