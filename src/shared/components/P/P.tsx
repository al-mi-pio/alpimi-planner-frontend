import type { ComponentPropsWithRef } from 'react';

import { StyledP } from '@/shared/components/P/P.style';

export interface PProps extends ComponentPropsWithRef<'p'> {
    /**
     * If the text should appear bold
     */
    bold?: boolean;
    /**
     * If the text should be a secondary color
     */
    secondary?: boolean;
}

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
