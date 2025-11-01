import type { Meta, StoryObj } from '@storybook/react';

import { fn } from '@storybook/test';

import MessageBox from '@/shared/components/MessageBox';
import { MessageType } from '@/shared/types';

export default {
    title: 'Shared/Components/MessageBox',
    argTypes: {
        children: {
            description: 'Text that will be rendered',
        },
    },
    component: MessageBox,
} satisfies Meta<typeof MessageBox>;

export const Success: StoryObj<typeof MessageBox> = {
    args: {
        type: MessageType.success,
        children: 'Example message',
        onClose: fn(),
    },
};

export const Warning: StoryObj<typeof MessageBox> = {
    args: {
        type: MessageType.warning,
        children: 'Example message',
        onClose: fn(),
    },
};

export const Info: StoryObj<typeof MessageBox> = {
    args: {
        type: MessageType.info,
        children: 'Example message',
        onClose: fn(),
    },
};

export const Error: StoryObj<typeof MessageBox> = {
    args: {
        type: MessageType.error,
        children: 'Example message',
        onClose: fn(),
    },
};

export const NoCloseButton: StoryObj<typeof MessageBox> = {
    args: {
        type: MessageType.error,
        children: 'Example message',
        noClosing: true,
        onClose: fn(),
    },
};
