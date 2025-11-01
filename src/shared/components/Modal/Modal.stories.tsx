import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from '@/shared/components/Button';
import Modal, { type ModalProps } from '@/shared/components/Modal/Modal';
import P from '@/shared/components/P';
import { StoryWrapper } from '@/shared/styles/Stories';

const CustomModal = ({ children, ...props }: ModalProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openUnclosable, setOpenUnclosable] = useState<boolean>(false);

    return (
        <StoryWrapper>
            <Modal {...props} open={open} onClose={() => setOpen(false)}>
                {children}
            </Modal>
            <Modal
                {...props}
                open={openUnclosable}
                footer={
                    <Button
                        label="Close"
                        appearance="secondary"
                        onClick={() => setOpenUnclosable(false)}
                    />
                }
            >
                <P>{children}</P>
                <P>
                    {
                        'The only way to close this modal is by using the button below'
                    }
                </P>
            </Modal>

            <Button label="Show modal" onClick={() => setOpen(true)} />
            <Button
                label="Show unclosable modal"
                onClick={() => setOpenUnclosable(true)}
            />
        </StoryWrapper>
    );
};

export default {
    title: 'Shared/Components/Modal',
    component: Modal,
    render: CustomModal,
    parameters: {
        docs: {
            description: {
                story: 'A dialog that pops-up on top layer of the page',
            },
        },
    },
} satisfies Meta<typeof Modal>;

export const Default: StoryObj<typeof Modal> = {
    args: {
        title: 'Example Modal',
        children: 'Content of the modal',
    },
};
