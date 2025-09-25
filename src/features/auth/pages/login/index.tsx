import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';

import { AxiosError } from 'axios';

import { authLogin } from '@/api/services/authService';
import { ErrorResponse } from '@/api/types';
import { AuthDTO, AuthResponse } from '@/api/types/AuthService';
import { AuthForm } from '@/features/auth/styles/Auth.style';
import Button from '@/shared/components/Button';
import Image from '@/shared/components/Image';
import Link from '@/shared/components/Link';
import LoadingBox from '@/shared/components/LoadingBox';
import MessageBox from '@/shared/components/MessageBox';
import Text from '@/shared/components/Text';
import {
    login as loginUrl,
    resetPassword,
    schedules,
} from '@/shared/constants/routes';
import { MessageType } from '@/shared/types';

const LoginPage = () => {
    const { t } = useTranslation('auth');
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(
        params.has('redirect') ? t('Session expired, please sign in again') : ''
    );
    const [credentials, setCredentials] = useState<AuthDTO>({
        login: '',
        password: '',
    });

    const onSuccess = ({ content }: AuthResponse) => {
        localStorage.setItem('accessToken', content);
        setMessage(t('Login successful'));
        navigate(params.get('redirect') ?? schedules);
    };
    const onError = (response: ErrorResponse | AxiosError) => {
        if ('errors' in response) setMessage(response.errors[0].message);
        else toast.error(t(response.message, { ns: 'general' }));
    };

    const { isPending, mutate: login } = useMutation({
        mutationFn: authLogin,
        onError,
        onSuccess,
    });

    useEffect(() => {
        if (params.get('redirect')?.startsWith(loginUrl)) setParams({});

        if (localStorage.getItem('accessToken'))
            navigate(params.get('redirect') ?? schedules);
    }, []);

    return (
        <LoadingBox loading={isPending}>
            <AuthForm>
                <Image
                    id="alpimi-logo"
                    src="/images/alpimilogo_trans.webp"
                    alt="Alpimi Planner logo"
                    width="200px"
                />

                {message && (
                    <MessageBox
                        type={
                            message === t('Login successful')
                                ? MessageType.success
                                : MessageType.error
                        }
                        noClosing
                    >
                        {message}
                    </MessageBox>
                )}

                <Text
                    label={t('Login')}
                    name="login"
                    value={credentials.login}
                    onChange={({ target }) =>
                        setCredentials((prev) => ({
                            ...prev,
                            login: target.value,
                        }))
                    }
                />

                <Text
                    label={t('Password')}
                    name="password"
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
                    label={t('Sign in')}
                />

                <Link href={resetPassword}>{t('I forgot my password')}</Link>
            </AuthForm>
        </LoadingBox>
    );
};

export default LoginPage;
