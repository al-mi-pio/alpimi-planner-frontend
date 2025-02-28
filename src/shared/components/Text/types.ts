import { ComponentPropsWithRef } from 'react';

export type TextTypes = 'text' | 'password' | 'email';

export interface TextProps
    extends Omit<ComponentPropsWithRef<'input'>, 'children'> {
    /**
     * What type of value the input expects
     */
    type?: TextTypes;
    /**
     * Optional label placed above the input
     */
    label?: string;
    /**
     * Optional error message underneath the field, also highlights the input
     */
    error?: string;
}
