import { StyledH } from '@/shared/components/H/H.style';
import type { HeadingLevel } from '@/shared/components/H/types';
import type { PProps } from '@/shared/components/P/P';

export interface HProps extends PProps {
    /**
     * Level of the heading, reflects the HTML \<h1\>, \<h2\>... etc. tags numeration
     */
    level: HeadingLevel;
}

/**
 * A UI component which renders a styled heading
 */
const H = ({
    level,
    bold = false,
    secondary = false,
    children,
    ...defaultProps
}: HProps) => (
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
