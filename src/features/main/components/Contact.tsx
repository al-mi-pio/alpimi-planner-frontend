import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
    type ComponentPropsWithRef,
    type FormEventHandler,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import {
    Layout,
    StyledContact,
    StyledForm,
    StyledMessage,
    StyledP,
} from '@/features/main/styles/Contact.style';
import Button from '@/shared/components/Button';
import LoadingBox from '@/shared/components/LoadingBox';
import Text from '@/shared/components/Text';
import { MessageType } from '@/shared/types';

export type ContactProps = Omit<ComponentPropsWithRef<'div'>, 'children'>;

/**
 * Contact section for the landing page
 */
export const Contact = (props: ContactProps) => {
    const { t } = useTranslation('main');
    const [message, setMessage] = useState('');
    const [captchaResponse, setCaptchaResponse] = useState('');

    const onHCaptchaChange = (token: string) => {
        setCaptchaResponse(token);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!captchaResponse) {
            setMessage(t('hCaptcha Token is mandatory for this form '));
            return;
        }

        const target = e.target as HTMLFormElement;
        const formData = new FormData(target);

        setMessage('sending');
        formData.append('access_key', '56e75862-056a-4b5f-a6ea-b610e622f57e');
        formData.append('h-captcha-response', captchaResponse);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setMessage(
                    t('We received your message Please wait for our response')
                );
                target.reset();
            } else {
                setMessage(
                    t(
                        data.message ||
                            'An error occurred while sending the message Please try again later'
                    )
                );
            }
        } catch {
            setMessage(
                t(
                    'An error occurred while sending the message Please try again later'
                )
            );
        }
    };

    return (
        <StyledContact {...props}>
            {message && message !== 'sending' && (
                <StyledMessage
                    type={
                        message ===
                        t(
                            'We received your message Please wait for our response'
                        )
                            ? MessageType.success
                            : MessageType.error
                    }
                    onClose={() => setMessage('')}
                >
                    {message}
                </StyledMessage>
            )}
            <Layout>
                <div>
                    <StyledP>{t('Sounds interenting')}</StyledP>
                    <StyledP id="contact">{t('Contact us')}</StyledP>
                </div>

                <LoadingBox loading={message === 'sending'}>
                    <StyledForm onSubmit={onSubmit}>
                        <Text
                            label={t('Name')}
                            name="name"
                            autoComplete="name"
                            error={undefined}
                            required
                        />
                        <Text
                            label={t('Email')}
                            name="email"
                            autoComplete="email"
                            error={undefined}
                            type="email"
                            required
                        />
                        <Text
                            label={t('Message')}
                            name="message"
                            error={undefined}
                            multiline
                            rows={10}
                            required
                        />
                        <HCaptcha
                            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                            reCaptchaCompat={false}
                            onVerify={onHCaptchaChange}
                        />
                        <Button
                            type="submit"
                            label={t('Send')}
                            appearance="secondary"
                        />
                    </StyledForm>
                </LoadingBox>
            </Layout>
        </StyledContact>
    );
};
