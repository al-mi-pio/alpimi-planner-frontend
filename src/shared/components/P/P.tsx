import { StyledP } from '@/shared/components/P/P.style';
import { PProps } from '@/shared/components/P/types';

/**
 * A UI component which renders a styled paragraph
 */
const P = ({
    bold = false,
    secondary = false,
    children,
    ...defaultProps
}: PProps) => (
    <StyledP $bold={bold} $secondary={secondary} {...defaultProps}>
        {children}
    </StyledP>
);

export default P;
