import { type ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
    StyledContact,
    StyledForm,
    StyledP,
} from '@/features/main/styles/Contact.style';
import Button from '@/shared/components/Button';
import Text from '@/shared/components/Text';

export type ContactProps = Omit<ComponentPropsWithRef<'div'>, 'children'>;

/**
 * Contact section for the landing page
 */
export const Contact = (props: ContactProps) => {
    const { t } = useTranslation('main');

    return (
        <StyledContact {...props}>
            <div>
                <StyledP>{t('Sound interenting')}</StyledP>
                <StyledP>{t('Contact us')}</StyledP>
            </div>

            <StyledForm>
                <Text label={t('Name')} error={undefined} required />
                <Text
                    label={t('Email')}
                    error={undefined}
                    type="email"
                    required
                />
                <Text label={t('Title')} error={undefined} required />
                <Text
                    label={t('Message')}
                    error={undefined}
                    multiline
                    rows={10}
                    required
                />
                <Button label={t('Send')} appearance="secondary" />
            </StyledForm>
        </StyledContact>
    );
};
