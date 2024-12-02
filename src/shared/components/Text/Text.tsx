import React from 'react';

import {
    StyledDescription,
    StyledInput,
    StyledLabel,
} from '@/shared/components/Text/Text.style';

export type TextTypes = 'text' | 'password' | 'email';

export interface TextProps extends React.ComponentProps<typeof StyledInput> {
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

/**
 * A UI component which accepts user text input
 */
const Text = ({ type, label, error, ...defaultProps }: TextProps) => (
    <label>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledInput $error={!!error} type={type || 'text'} {...defaultProps} />
        {error && <StyledDescription>{error}</StyledDescription>}
    </label>
);
export default Text;
