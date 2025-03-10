import { useId } from 'react';

import { TextProps } from '@/shared/components/Text/types';
import { StyledInput } from '@/shared/styles/Common';
import { Label, ErrorDescription } from '@/shared/styles/Strings';

/**
 * A UI component which accepts user text input
 */
const Text = ({ type = 'text', label, error, ...defaultProps }: TextProps) => {
    const errorDescriptionId = useId();
    return (
        <label>
            {label && <Label>{label}</Label>}
            <StyledInput
                $error={!!error}
                aria-invalid={!!error}
                aria-describedby={error ? errorDescriptionId : undefined}
                type={type}
                {...defaultProps}
            />
            {error && (
                <ErrorDescription role="alert" id={errorDescriptionId}>
                    {error}
                </ErrorDescription>
            )}
        </label>
    );
};
export default Text;
