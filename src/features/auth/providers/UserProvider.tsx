import { useQuery } from '@tanstack/react-query';
import { type ReactNode } from 'react';

import { jwtDecode } from 'jwt-decode';

import { userGet } from '@/api/services/userService';
import type { Id } from '@/api/types';
import { UserContext } from '@/features/auth/contexts';
import LoadingBox from '@/shared/components/LoadingBox';

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem('accessToken');
    const id = token ? jwtDecode<{ userId: Id }>(token).userId : '0-0-0-0-0';
    const { data, isPending } = useQuery({
        queryKey: ['user', id],
        queryFn: () => userGet(id),
        enabled: id !== '0-0-0-0-0',
        select: (data) => data.content,
    });

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
