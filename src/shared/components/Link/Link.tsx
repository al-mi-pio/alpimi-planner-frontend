import { StyledLink, StyledP } from '@/shared/components/Link/Link.style';
import { LinkProps } from '@/shared/components/Link/types';

/**
 * A UI component used for navigation
 */
const Link = ({ children, ...defaultProps }: LinkProps) => (
    <StyledLink {...defaultProps}>
        <StyledP>{children}</StyledP>
    </StyledLink>
);

export default Link;
