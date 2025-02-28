import { useId } from 'react';

import {
    StyledDescription,
    StyledInput,
    StyledLabel,
} from '@/shared/components/Text/Text.style';
import { TextProps } from '@/shared/components/Text/types';

/**
 * A UI component which accepts user text input
 */
const Text = ({ type = 'text', label, error, ...defaultProps }: TextProps) => {
    const errorDescriptionId = useId();
    return (
        <label>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledInput
                $error={!!error}
                aria-invalid={!!error}
                aria-describedby={error ? errorDescriptionId : undefined}
                type={type}
                {...defaultProps}
            />
            {error && (
                <StyledDescription role="alert" id={errorDescriptionId}>
                    {error}
                </StyledDescription>
            )}
        </label>
    );
};
export default Text;
