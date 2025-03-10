import { useId } from 'react';

import { StyledNumber } from '@/shared/components/Number/Number.style';
import { StyledInput } from '@/shared/styles/Common';
import { Label, ErrorDescription } from '@/shared/styles/Strings';
import { InputProps } from '@/shared/types/inputs';

/**
 * A UI component which accepts user numeric input
 */
const Number = ({ label, error, ...defaultProps }: InputProps) => {
    const errorDescriptionId = useId();
    return (
        <label>
            {label && <Label>{label}</Label>}
            <StyledNumber>
                <StyledInput
                    $error={!!error}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorDescriptionId : undefined}
                    type="number"
                    {...defaultProps}
                />
            </StyledNumber>

            {error && (
                <ErrorDescription role="alert" id={errorDescriptionId}>
                    {error}
                </ErrorDescription>
            )}
        </label>
    );
};
export default Number;
