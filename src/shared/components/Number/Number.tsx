import { type ChangeEvent, useEffect, useId, useState } from 'react';

import {
    SpinButton,
    SpinButtons,
} from '@/shared/components/Number/Number.style';
import { InnerInput, InputWrapper } from '@/shared/styles/Common';
import { Label, ErrorDescription } from '@/shared/styles/Strings';
import type { InputProps } from '@/shared/types/inputs';

/**
 * A UI component which accepts user numeric input
 */
const Number = ({ label, error, ...defaultProps }: InputProps) => {
    const errorDescriptionId = useId();
    const [value, setValue] = useState<string | number | readonly string[]>('');

    useEffect(() => {
        setValue(defaultProps.value ?? '');
    }, [defaultProps.value]);

    return (
        <label>
            {label && <Label>{label}</Label>}
            <InputWrapper $error={!!error}>
                <InnerInput
                    aria-invalid={!!error}
                    aria-describedby={error ? errorDescriptionId : undefined}
                    type="number"
                    {...defaultProps}
                    value={value}
                    onChange={
                        defaultProps.onChange ||
                        (({ target }) => setValue(target.value))
                    }
                />
                <SpinButtons>
                    <SpinButton
                        onClick={(e) => {
                            if (defaultProps.onChange)
                                defaultProps.onChange({
                                    ...e,
                                    target: {
                                        ...e.target,
                                        value: value
                                            ? String(
                                                  parseInt(String(value)) + 1
                                              )
                                            : '1',
                                    },
                                } as unknown as ChangeEvent<HTMLInputElement>);
                            else
                                setValue((prev) =>
                                    prev ? parseInt(String(prev)) + 1 : 1
                                );
                        }}
                    >
                        &#9650;
                    </SpinButton>
                    <SpinButton
                        onClick={(e) => {
                            if (defaultProps.onChange)
                                defaultProps.onChange({
                                    ...e,
                                    target: {
                                        ...e.target,
                                        value: value
                                            ? String(
                                                  parseInt(String(value)) - 1
                                              )
                                            : '-1',
                                    },
                                } as unknown as ChangeEvent<HTMLInputElement>);
                            else
                                setValue((prev) =>
                                    prev ? parseInt(String(prev)) - 1 : -1
                                );
                        }}
                    >
                        &#9660;
                    </SpinButton>
                </SpinButtons>
            </InputWrapper>

            {error && (
                <ErrorDescription role="alert" id={errorDescriptionId}>
                    {error}
                </ErrorDescription>
            )}
        </label>
    );
};
export default Number;
