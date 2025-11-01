import type { ReactNode } from 'react';

import { AuthBodyStyles, CenterBox } from '@/features/auth/styles/Auth.style';
import Toast from '@/shared/components/Toast';

const Auth = ({ children }: { children: ReactNode }) => (
    <>
        <AuthBodyStyles />
        {!!children && <CenterBox>{children}</CenterBox>}
        <Toast />
    </>
);

export default Auth;
