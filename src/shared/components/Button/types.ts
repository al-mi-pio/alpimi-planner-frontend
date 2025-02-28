import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type Appearance = 'primary' | 'secondary';

export interface ButtonProps
    extends Omit<
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        'children'
    > {
    /**
     * The appearance of the button
     */
    appearance?: Appearance;

    /**
     * Text label that describes the button
     */
    label?: string;
}
