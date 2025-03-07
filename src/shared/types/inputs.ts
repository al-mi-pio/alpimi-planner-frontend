import { ComponentPropsWithRef } from 'react';

export interface InputProps
    extends Omit<ComponentPropsWithRef<'input'>, 'children'> {
    /**
     * Optional label that describes the input
     */
    label?: string;
    /**
     * Optional error message, also highlights the input
     */
    error?: string;
}
