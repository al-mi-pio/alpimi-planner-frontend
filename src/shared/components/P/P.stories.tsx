import { Meta, StoryObj } from '@storybook/react';

import P from '@/shared/components/P';

// noinspection JSUnusedGlobalSymbols
export default {
    title: 'Shared/Components/P',
    component: P,
    render: ({ bold, secondary }) => (
        <P bold={bold} secondary={secondary}>
            {'Example text'}
        </P>
    ),
} satisfies Meta<typeof P>;

// noinspection JSUnusedGlobalSymbols
export const Default: StoryObj<typeof P> = {
    args: {
        bold: false,
        secondary: false,
    },
};
