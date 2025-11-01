import type { Meta, StoryObj } from '@storybook/react';

import { ReconnectModal } from '@/features/main/components/ReconnectModal';

export default {
    title: 'Features/Main/Components/ReconnectModal',
    component: ReconnectModal,
} satisfies Meta<typeof ReconnectModal>;

export const Default: StoryObj<typeof ReconnectModal> = {};
