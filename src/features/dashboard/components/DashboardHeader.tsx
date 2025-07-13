import { ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
    ButtonGroup,
    Header,
    Nav,
    StyledButton,
    User,
    Wrapper,
} from '@/features/dashboard/styles/DashboardHeader.style';
import { NavButton } from '@/features/dashboard/types';
import H from '@/shared/components/H';
import Link from '@/shared/components/Link';
import Arrowhead from '@/shared/icons/Arrowhead';
import UserCircle from '@/shared/icons/UserCircle';

export interface DashboardHeaderProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    backRoute?: string;
    navigation: NavButton[];
    header?: string;
}

/**
 * A header displayed at the top of dashboard pages
 */
export const DashboardHeader = ({
    backRoute,
    header,
    navigation,
    ...defaultProps
}: DashboardHeaderProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation('dashboard');

    return (
        <Wrapper {...defaultProps}>
            <Nav>
                {!!backRoute && (
                    <Link href={backRoute} aria-label={t('Previous page')}>
                        <Arrowhead direction="left" />
                    </Link>
                )}

                <ButtonGroup>
                    {navigation.map(({ label, route }) => (
                        <StyledButton
                            $selected={window.location.pathname === route}
                            key={label}
                            appearance="secondary"
                            label={label}
                            onClick={() => navigate(route)}
                        />
                    ))}
                </ButtonGroup>
            </Nav>

            <Header>
                <H level={4} bold>
                    {header}
                </H>
            </Header>

            <User>
                {/*TODO: User dropdown*/}
                <UserCircle />
            </User>
        </Wrapper>
    );
};
