import { ComponentPropsWithRef } from 'react';

import { StyledButton } from '@/shared/components/Button/Button.style';
import { Appearance } from '@/shared/components/Button/types';
import H from '@/shared/components/H';

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
