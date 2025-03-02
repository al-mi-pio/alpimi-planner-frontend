import { Meta, StoryObj } from '@storybook/react';

import Image from '@/shared/components/Image';

export default {
    title: 'Shared/Components/Image',
    component: Image,
    argTypes: {
        src: {
            description: 'Url or path to the image',
            type: {
                name: 'string',
                required: true,
            },
        },
        alt: {
            description: 'Alternative text that describes the image',
            type: {
                name: 'string',
                required: true,
            },
        },
    },
} satisfies Meta<typeof Image>;

export const Default: StoryObj<typeof Image> = {
    args: {
        src: 'https://picsum.photos/id/71/700/400',
        alt: 'An image of a swing',
    },
};
