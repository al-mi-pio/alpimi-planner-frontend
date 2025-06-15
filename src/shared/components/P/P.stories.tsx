import { Meta, StoryObj } from '@storybook/react';

import P from '@/shared/components/P';

export default {
    title: 'Shared/Components/P',
    argTypes: {
        children: {
            description: 'Text that will be rendered',
        },
    },
    component: P,
} satisfies Meta<typeof P>;

export const Default: StoryObj<typeof P> = {
    args: {
        bold: false,
        secondary: false,
        children: 'Example text',
    },
};
