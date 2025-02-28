import { ComponentPropsWithRef } from 'react';

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
