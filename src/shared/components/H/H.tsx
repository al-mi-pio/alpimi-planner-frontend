import { StyledH } from '@/shared/components/H/H.style';
import { HProps } from '@/shared/components/H/types';

/**
 * A UI component which renders a styled heading
 */
const H = ({ level, bold, secondary, children, ...defaultProps }: HProps) => (
    <StyledH
        $level={level}
        $bold={bold}
        $secondary={secondary}
        {...defaultProps}
    >
        {children}
    </StyledH>
);

export default H;
