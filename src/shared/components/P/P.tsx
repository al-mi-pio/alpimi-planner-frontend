import React from 'react';

import { StyledP } from '@/shared/components/P/P.style.tsx';

export interface PProps extends React.ComponentProps<typeof StyledP> {
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
const P = ({ bold, secondary, children, ...defaultProps }: PProps) => (
    <StyledP $bold={bold} $secondary={secondary} {...defaultProps}>
        {children}
    </StyledP>
);

// eslint-disable-next-line react-refresh/only-export-components
export default P;
