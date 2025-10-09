import type { ComponentPropsWithRef, ReactNode } from 'react';

import type { Appearance } from '@/shared/components/Button/types';
import H from '@/shared/components/H';
import { IconButton, StyledButton } from '@/shared/styles/Common';

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

    /**
     * Icon that describes the button
     */
    icon?: ReactNode;
}

/**
 * A UI component which renders a styled button
 */
const Button = ({
    appearance = 'primary',
    icon,
    label,
    ...defaultProps
}: ButtonProps) =>
    label ? (
        <StyledButton $appearance={appearance} {...defaultProps}>
            <H level={4}>{label}</H>
        </StyledButton>
    ) : (
        <IconButton {...defaultProps}>{icon}</IconButton>
    );

export default Button;
