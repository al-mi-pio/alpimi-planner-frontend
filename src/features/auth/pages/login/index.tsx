import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AxiosError } from 'axios';

import { authLogin } from '@/api/services/authService';
import { ErrorResponse } from '@/api/types';
import { AuthDTO, AuthResponse } from '@/api/types/AuthService';
import { AuthForm } from '@/features/auth/styles/Auth.style';
import Button from '@/shared/components/Button';
import Image from '@/shared/components/Image';
import Link from '@/shared/components/Link';
import P from '@/shared/components/P';
import Text from '@/shared/components/Text';

const LoginPage = () => {
    const { t } = useTranslation('auth');
    const [message, setMessage] = useState('');
    const [credentials, setCredentials] = useState<AuthDTO>({
        login: '',
        password: '',
    });

    const onSuccess = ({ content }: AuthResponse) => {
        localStorage.setItem('accessToken', content);
        setMessage(t('Login successful'));
    };
    const onError = (response: ErrorResponse | AxiosError) => {
        if ('errors' in response) setMessage(response.errors[0].message);
        // TODO: Replace with Toast
        else console.log(response.message);
    };

    const { isPending, mutate: login } = useMutation({
        mutationFn: authLogin,
        onError,
        onSuccess,
    });

    // TODO: Replace with LoadingBox
    if (isPending) return <P>{'Loading...'}</P>;

    return (
        <AuthForm>
            <Image
                id="alpimi-logo"
                src="/images/alpimilogo_trans.webp"
                alt="Alpimi Planner logo"
                width="236px"
            />

            {
                // TODO: Replace with MessageBox
                message && <P>{message}</P>
            }

            <Text
                label={t('Username')}
                value={credentials.login}
                onChange={({ target }) =>
                    setCredentials((prev) => ({ ...prev, login: target.value }))
                }
            />

            <Text
                label={t('Password')}
                type="password"
                value={credentials.password}
                onChange={({ target }) =>
                    setCredentials((prev) => ({
                        ...prev,
                        password: target.value,
                    }))
                }
            />

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    login(credentials);
                }}
                label={t('Login')}
            />

            <Link href="/resetpassword">{t('I forgot my password')}</Link>
        </AuthForm>
    );
};

export default LoginPage;
