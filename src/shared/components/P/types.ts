import { ComponentProps } from 'react';

import { StyledP } from '@/shared/components/P/P.style';

export interface PProps extends ComponentProps<typeof StyledP> {
    /**
     * If the text should appear bold
     */
    bold?: boolean;
    /**
     * If the text should be a secondary color
     */
    secondary?: boolean;
}
