import { useId } from 'react';

import { StyledInput } from '@/shared/styles/Common';
import { Label, ErrorDescription } from '@/shared/styles/Strings';
import type { InputProps } from '@/shared/types/inputs';

/**
 * A UI component which accepts user date input
 */
const Date = ({ label, error, ...defaultProps }: InputProps) => {
    const errorDescriptionId = useId();
    return (
        <label>
            {label && <Label>{label}</Label>}
            <StyledInput
                $error={!!error}
                aria-invalid={!!error}
                aria-describedby={error ? errorDescriptionId : undefined}
                type="date"
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
export default Date;
