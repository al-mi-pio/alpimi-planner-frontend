import { useId } from 'react';

import {
    CheckboxWrapper,
    StyledCheckbox,
} from '@/shared/components/Checkbox/Checkbox.style';
import P from '@/shared/components/P';
import { ErrorDescription } from '@/shared/styles/Strings';
import type { InputProps } from '@/shared/types/inputs';

/**
 * A UI component which accepts user boolean input
 */
const Checkbox = ({ label, error, ...defaultProps }: InputProps) => {
    const errorDescriptionId = useId();
    return (
        <label>
            <CheckboxWrapper>
                <StyledCheckbox
                    $error={!!error}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorDescriptionId : undefined}
                    type="checkbox"
                    {...defaultProps}
                />
                {label && <P>{label}</P>}
            </CheckboxWrapper>

            {error && (
                <ErrorDescription role="alert" id={errorDescriptionId}>
                    {error}
                </ErrorDescription>
            )}
        </label>
    );
};

export default Checkbox;
