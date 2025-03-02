import { Meta, StoryObj } from '@storybook/react';

import P from '@/shared/components/P';

export default {
    title: 'Shared/Components/P',
    argTypes: {
        bold: {
            type: 'boolean',
            description: 'If the text should appear bold',
        },
        secondary: {
            type: 'boolean',
            description: 'If the text should be a secondary color',
        },
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
