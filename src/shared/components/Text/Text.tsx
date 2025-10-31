import { type ComponentPropsWithRef, useId } from 'react';

import type { TextTypes } from '@/shared/components/Text/types';
import { StyledInput, StyledTextarea } from '@/shared/styles/Common';
import { ErrorDescription, Label } from '@/shared/styles/Strings';

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
    /**
     * Optional flag that renders a textarea instead of text input
     */
    multiline?: boolean;
    rows?: number;
}

/**
 * A UI component which accepts user text input
 */
const Text = ({
    type = 'text',
    label,
    error,
    multiline,
    rows,
    ...defaultProps
}: TextProps) => {
    const errorDescriptionId = useId();
    return (
        <label>
            {label && <Label>{label}</Label>}
            {multiline ? (
                <StyledTextarea
                    $error={!!error}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorDescriptionId : undefined}
                    rows={rows}
                    {...(defaultProps as ComponentPropsWithRef<'textarea'>)}
                />
            ) : (
                <StyledInput
                    $error={!!error}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorDescriptionId : undefined}
                    type={type}
                    {...defaultProps}
                />
            )}

            {error && (
                <ErrorDescription role="alert" id={errorDescriptionId}>
                    {error}
                </ErrorDescription>
            )}
        </label>
    );
};
export default Text;
