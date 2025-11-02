import { type ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { jwtDecode } from 'jwt-decode';

import { userGet } from '@/api/services/userService';
import type { Id } from '@/api/types';
import { UserContext } from '@/features/auth/contexts';
import LoadingBox from '@/shared/components/LoadingBox';
import { useGetData } from '@/shared/hooks/useGetData';
import { tokenExpirationUrl } from '@/shared/utils/url';

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const [userId, setUserId] = useState<Id>();
    const { data, isPending } = useGetData({
        queryKey: ['user', userId],
        queryFn: () => userGet(userId!),
        enabled: !!userId,
        select: (data) => data.content,
    });

    useEffect(() => {
        if (token) {
            try {
                const id = jwtDecode<{ userId: Id }>(token).userId;
                setUserId(id);
            } catch {
                localStorage.removeItem('accessToken');
                navigate(tokenExpirationUrl());
            }
        } else {
            localStorage.removeItem('accessToken');
            navigate(tokenExpirationUrl());
        }
    }, []);

    return (
        <LoadingBox loading={isPending}>
            {data ? (
                <UserContext.Provider value={data}>
                    {children}
                </UserContext.Provider>
            ) : (
                children
            )}
        </LoadingBox>
    );
};
