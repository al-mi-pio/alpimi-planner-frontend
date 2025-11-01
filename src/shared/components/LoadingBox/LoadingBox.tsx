import type { ComponentPropsWithRef } from 'react';

import {
    DisabledBox,
    EnabledBox,
} from '@/shared/components/LoadingBox/LoadingBox.style';

export interface LoadingBoxProps extends ComponentPropsWithRef<'fieldset'> {
    /**
     * A flag that determines the state of the loader
     */
    loading: boolean;
}

/**
 * A UI component which wraps components that are in a loading state
 */
const LoadingBox = ({
    loading,
    children,
    ...defaultProps
}: LoadingBoxProps) => {
    return loading ? (
        <DisabledBox disabled {...defaultProps}>
            {children}
        </DisabledBox>
    ) : (
        <EnabledBox {...defaultProps}>{children}</EnabledBox>
    );
};

export default LoadingBox;
