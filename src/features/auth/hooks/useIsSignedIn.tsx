import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { authRefresh } from '@/api/services/authService';

export const useIsSignedIn = () => {
    const { isPending, data } = useQuery({
        queryKey: ['token'],
        queryFn: authRefresh,
        retry: false,
        enabled: !!localStorage.getItem('accessToken'),
    });

    useEffect(() => {
        if (data) localStorage.setItem('accessToken', data.content);
    }, [data]);

    return { isPending, isSignedIn: !!data };
};
