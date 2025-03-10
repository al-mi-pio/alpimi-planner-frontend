import { ComponentPropsWithRef } from 'react';

export interface LinkProps extends ComponentPropsWithRef<'a'> {
    /**
     * Target URL to navigate to
     */
    href: string;
}
