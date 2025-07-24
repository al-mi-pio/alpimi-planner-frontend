import { ComponentPropsWithRef } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton } from '@/shared/components/Close/Close.style';

export interface CloseProps
    extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
    /**
     * Color for the close icon
     */
    $color?: string;
}

/**
 * A close button
 */
const Close = (props: CloseProps) => {
    const { t } = useTranslation();

    return (
        <StyledButton {...props} aria-label={t('Close')}>
            X
        </StyledButton>
    );
};

export default Close;
