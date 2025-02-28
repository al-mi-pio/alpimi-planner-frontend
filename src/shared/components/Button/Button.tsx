import { StyledButton } from '@/shared/components/Button/Button.style';
import { ButtonProps } from '@/shared/components/Button/types';
import H from '@/shared/components/H';

/**
 * A UI component which renders a styled button
 */
const Button = ({ appearance, label, ...defaultProps }: ButtonProps) => (
    <StyledButton $appearance={appearance ?? 'primary'} {...defaultProps}>
        <H level={4}>{label}</H>
    </StyledButton>
);

export default Button;
