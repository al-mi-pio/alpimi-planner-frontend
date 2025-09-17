import { ComponentPropsWithRef, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Close from '@/shared/components/Close';
import H from '@/shared/components/H';
import {
    ModalContent,
    ModalFooter,
    ModalHeader,
    StyledModal,
} from '@/shared/components/Modal/Modal.style';
import P from '@/shared/components/P';

export interface ModalProps extends ComponentPropsWithRef<'dialog'> {
    /**
     * Determines if modal should be opened or not
     */
    open: boolean;
    /**
     * Modal title
     */
    title?: string;
    /**
     * Modal footer usually containing action buttons
     */
    footer?: ReactNode;
    /**
     * An event that runs when closing the modal. If not provided, modal becomes unclosable by user
     */
    onClose?: () => void;
}

/**
 * A dialog that pops-up on top layer of the page
 */
const Modal = ({
    open,
    onClose,
    title,
    children,
    footer,
    ...defaultProps
}: ModalProps) => {
    const ref = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (open && !ref.current?.open) ref.current?.showModal();
        if (!open && ref.current?.open) ref.current?.close();
    }, [open]);

    if (!open) return null;

    return createPortal(
        <StyledModal
            {...defaultProps}
            onClose={onClose}
            ref={ref}
            // @ts-expect-error closedby is not recognized by React
            closedby={onClose ? 'any' : 'none'}
        >
            <ModalHeader>
                <H level={4}>{title}</H>
                {onClose && <Close onClick={onClose} />}
            </ModalHeader>

            <ModalContent>
                {typeof children === 'string' ? <P>{children}</P> : children}
            </ModalContent>

            {footer && <ModalFooter>{footer}</ModalFooter>}
        </StyledModal>,
        document.body
    );
};

export default Modal;
