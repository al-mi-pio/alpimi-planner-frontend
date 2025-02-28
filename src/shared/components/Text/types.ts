import { ComponentProps } from 'react';

import { StyledInput } from '@/shared/components/Text/Text.style';

export type TextTypes = 'text' | 'password' | 'email';

export interface TextProps extends ComponentProps<typeof StyledInput> {
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
