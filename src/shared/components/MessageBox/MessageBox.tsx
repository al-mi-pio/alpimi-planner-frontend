import type { ComponentPropsWithRef } from 'react';

import { useTheme } from 'styled-components';

import Close from '@/shared/components/Close';
import {
    ButtonWrapper,
    StyledMessageBox,
} from '@/shared/components/MessageBox/MessageBox.style';
import { getMessageBoxColors } from '@/shared/components/MessageBox/utils';
import P from '@/shared/components/P';
import { MessageType } from '@/shared/types';

export interface MessageBoxProps extends ComponentPropsWithRef<'div'> {
    /**
     * Type of message which changes the color
     */
    type?: MessageType;
    /**
     * An event that runs on closing the message
     */
    onClose?: () => void;
    /**
     * A flag that disables the close button
     */
    noClosing?: boolean;
}

/**
 * A UI component which renders a message box
 */
const MessageBox = ({
    type = MessageType.success,
    noClosing,
    children,
    onClose,
    ...defaultProps
}: MessageBoxProps) => {
    const theme = useTheme();

    return (
        <StyledMessageBox $type={type} {...defaultProps}>
            {typeof children === 'string' ? <P>{children}</P> : children}
            {!noClosing && (
                <ButtonWrapper>
                    <Close
                        $color={getMessageBoxColors(theme)[type]}
                        onClick={onClose}
                    />
                </ButtonWrapper>
            )}
        </StyledMessageBox>
    );
};

export default MessageBox;
