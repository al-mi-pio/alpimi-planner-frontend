import { type ComponentPropsWithRef, useId } from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect from 'react-select';

import { StyledSelect } from '@/shared/components/Select/Select.style';
import type { SelectOption } from '@/shared/components/Select/types';
import { Label, ErrorDescription } from '@/shared/styles/Strings';

export interface SelectProps extends ComponentPropsWithRef<ReactSelect> {
    /**
     * An array of options available for the dropdown
     */
    options: SelectOption[];
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
 * A UI component which accepts user selective input
 */
const Select = ({ label, error, ...defaultProps }: SelectProps) => {
    const { t } = useTranslation();
    const errorDescriptionId = useId();

    return (
        <label>
            {label && <Label>{label}</Label>}
            <StyledSelect
                // @ts-expect-error I gave up to type this properly
                $error={!!error}
                aria-invalid={!!error}
                aria-describedby={error ? errorDescriptionId : undefined}
                noOptionsMessage={() => t('No results...')}
                isClearable={true}
                placeholder=""
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
export default Select;
