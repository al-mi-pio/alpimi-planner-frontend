import type { Meta, StoryObj } from '@storybook/react';

import MultiStep from '@/shared/components/MultiStep';

export default {
    title: 'Shared/Components/MultiStep',
    component: MultiStep,
} satisfies Meta<typeof MultiStep>;

export const Default: StoryObj<typeof MultiStep> = {
    args: {
        currentStep: 0,
        steps: ['Step 1', 'Another step', 'Final step'],
    },
};
