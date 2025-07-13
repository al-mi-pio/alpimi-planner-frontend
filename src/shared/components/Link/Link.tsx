import { ComponentPropsWithRef } from 'react';

import { StyledLink, StyledP } from '@/shared/components/Link/Link.style';

export interface LinkProps extends ComponentPropsWithRef<'a'> {
    /**
     * Target URL to navigate to
     */
    href: string;
}

/**
 * A UI component used for navigation
 */
const Link = ({ children, ...defaultProps }: LinkProps) => (
    <StyledLink {...defaultProps}>
        {typeof children === 'string' ? (
            <StyledP>{children}</StyledP>
        ) : (
            children
        )}
    </StyledLink>
);

export default Link;
