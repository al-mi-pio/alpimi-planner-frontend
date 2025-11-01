import { type ComponentPropsWithRef, useId } from 'react';
import { useTranslation } from 'react-i18next';

import P from '@/shared/components/P';
import { StyledUpload } from '@/shared/components/Upload/Upload.style';
import { ErrorDescription, Label } from '@/shared/styles/Strings';

export interface UploadProps
    extends Omit<ComponentPropsWithRef<'input'>, 'children'> {
    /**
     * Optional label placed above the input
     */
    label?: string;
    /**
     * Optional error message underneath the field, also highlights the input
     */
    error?: string;
    /**
     * Optional props for the dropzone
     */
    dropzoneProps?: ComponentPropsWithRef<typeof StyledUpload>;
}

/**
 * A UI component which accepts user file input
 */
const Upload = ({
    label,
    error,
    dropzoneProps,
    ...defaultProps
}: UploadProps) => {
    const errorDescriptionId = useId();
    const { t } = useTranslation();
    return (
        <label>
            {label && <Label>{label}</Label>}

            <StyledUpload $error={!!error} {...dropzoneProps}>
                <P>{t('Click or DragDrop to upload a file')}</P>
                <input
                    aria-invalid={!!error}
                    aria-describedby={error ? errorDescriptionId : undefined}
                    type="file"
                    hidden
                    {...defaultProps}
                />
            </StyledUpload>

            {error && (
                <ErrorDescription role="alert" id={errorDescriptionId}>
                    {error}
                </ErrorDescription>
            )}
        </label>
    );
};
export default Upload;
