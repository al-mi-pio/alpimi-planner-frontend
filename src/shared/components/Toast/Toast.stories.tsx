import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'react-toastify';

import Button from '@/shared/components/Button';
import Toast from '@/shared/components/Toast';
import { StoryWrapper } from '@/shared/styles/Stories';

const CustomToast = ({ content }: { content: string }) => {
    const notify = () => toast(content);
    const info = () => toast.info(content);
    const warning = () => toast.warning(content);
    const error = () => toast.error(content);
    const success = () => toast.success(content);

    return (
        <StoryWrapper>
            <Button label={'Show normal toast'} onClick={notify} />
            <Button label={'Show info toast'} onClick={info} />
            <Button label={'Show warning toast'} onClick={warning} />
            <Button label={'Show error toast'} onClick={error} />
            <Button label={'Show success toast'} onClick={success} />
            <Toast />
        </StoryWrapper>
    );
};

export default {
    title: 'Shared/Components/Toast',
    render: CustomToast,
    parameters: {
        docs: {
            description: {
                story: 'A component used for displaying API messages',
            },
        },
    },
} satisfies Meta<typeof CustomToast>;

export const Default: StoryObj<typeof CustomToast> = {
    args: {
        content: 'Example message',
    },
};
