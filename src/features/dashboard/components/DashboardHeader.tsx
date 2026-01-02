import { useQueryClient } from '@tanstack/react-query';
import type { ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
    ButtonGroup,
    Header,
    Nav,
    Spacer,
    StyledButton,
    User,
    Wrapper,
} from '@/features/dashboard/styles/DashboardHeader.style';
import type { NavButton } from '@/features/dashboard/types';
import Dropdown, { DropdownItem } from '@/shared/components/Dropdown';
import H from '@/shared/components/H';
import Link from '@/shared/components/Link';
import { login } from '@/shared/constants/routes';
import Arrowhead from '@/shared/icons/Arrowhead';
import UserCircle from '@/shared/icons/UserCircle';

export interface DashboardHeaderProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    backRoute?: string;
    navigation: NavButton[];
    header?: string;
    noUser?: boolean;
}

/**
 * A header displayed at the top of dashboard pages
 */
export const DashboardHeader = ({
    backRoute,
    header,
    navigation,
    noUser,
    ...defaultProps
}: DashboardHeaderProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { t } = useTranslation('dashboard');

    return (
        <Wrapper {...defaultProps}>
            <Nav>
                {backRoute ? (
                    <Link href={backRoute} aria-label={t('Previous page')}>
                        <Arrowhead direction="left" />
                    </Link>
                ) : (
                    <Spacer />
                )}

                <ButtonGroup>
                    {navigation.map(({ label, route }) => (
                        <StyledButton
                            $selected={
                                window.location.pathname === encodeURI(route)
                            }
                            key={t(label)}
                            appearance="secondary"
                            label={t(label)}
                            onClick={() => navigate(route)}
                        />
                    ))}
                </ButtonGroup>
            </Nav>

            <Header>
                <H level={4} bold>
                    {header && t(header)}
                </H>
            </Header>

            <User>
                {!noUser && (
                    <Dropdown
                        label={<UserCircle />}
                        buttonLabel={t('User dropdown button')}
                    >
                        <DropdownItem
                            onClick={() => {
                                queryClient.clear();
                                localStorage.removeItem('accessToken');
                                navigate(login);
                            }}
                        >
                            {t('Logout')}
                        </DropdownItem>
                    </Dropdown>
                )}
            </User>
        </Wrapper>
    );
};
