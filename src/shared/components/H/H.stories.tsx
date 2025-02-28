import { Meta, StoryObj } from '@storybook/react';

import H from '@/shared/components/H';

export default {
    title: 'Shared/Components/H',
    component: H,
    render: ({ level, bold, secondary }) => (
        <H level={level} bold={bold} secondary={secondary}>
            {'Example text'}
        </H>
    ),
} satisfies Meta<typeof H>;

export const Default: StoryObj<typeof H> = {
    args: {
        level: 1,
        bold: false,
        secondary: false,
    },
};
