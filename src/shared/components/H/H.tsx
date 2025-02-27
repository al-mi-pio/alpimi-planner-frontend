import { StyledH } from '@/shared/components/H/H.style';
import { PProps } from '@/shared/components/P/P';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface HProps extends PProps {
    /**
     * Level of the heading, reflects the HTML \<h1\>, \<h2\>... etc. tags numeration
     */
    level: HeadingLevel;
}

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
