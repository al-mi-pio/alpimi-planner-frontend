import { type ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Header, Nav, NavLink } from '@/features/main/styles/MainHeader.style';
import Button from '@/shared/components/Button';
import Image from '@/shared/components/Image';

export interface MainHeaderProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    navigateTo: string;
    buttonLabel: string;
}

/**
 * Main header for the landing page
 */
export const MainHeader = ({
    navigateTo,
    buttonLabel,
    ...defaultProps
}: MainHeaderProps) => {
    const { t } = useTranslation();
    return (
        <Header {...defaultProps}>
            <Image
                id="alpimi-logo"
                src="/images/alpimilogo_trans.webp"
                alt="Alpimi Planner logo"
                width="123px"
            />
            <Nav>
                <NavLink href={'#'}>{t('About us')}</NavLink>
                <NavLink href={'#'}>{t('Contact')}</NavLink>
            </Nav>
            <Button label={t('Sign in')} appearance="secondary" />
        </Header>
    );
};
