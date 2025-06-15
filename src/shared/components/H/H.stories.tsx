import { Meta, StoryObj } from '@storybook/react';

import H from '@/shared/components/H';

export default {
    title: 'Shared/Components/H',
    argTypes: {
        level: {
            control: { type: 'range', min: 1, max: 6 },
        },
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
    component: H,
} satisfies Meta<typeof H>;

export const Default: StoryObj<typeof H> = {
    args: {
        level: 1,
        bold: false,
        secondary: false,
        children: 'Example text',
    },
};
