import { ReactNode } from 'react';

import { AuthBodyStyles, CenterBox } from '@/features/auth/styles/Auth.style';

const Auth = ({ children }: { children: ReactNode }) => (
    <>
        <AuthBodyStyles />
        {!!children && <CenterBox>{children}</CenterBox>}
    </>
);

export default Auth;
