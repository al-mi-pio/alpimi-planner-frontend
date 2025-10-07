import type { ComponentPropsWithRef } from 'react';

import type { Appearance } from '@/shared/components/Button/types';
import H from '@/shared/components/H';
import { StyledButton } from '@/shared/styles/Common';

export interface ButtonProps
    extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
    /**
     * The appearance of the button
     */
    appearance?: Appearance;

    /**
     * Text label that describes the button
     */
    label?: string;
}

/**
 * A UI component which renders a styled button
 */
const Button = ({
    appearance = 'primary',
    label,
    ...defaultProps
}: ButtonProps) => (
    <StyledButton $appearance={appearance} {...defaultProps}>
        <H level={4}>{label}</H>
    </StyledButton>
);

export default Button;
