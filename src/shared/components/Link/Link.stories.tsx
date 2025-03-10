import { Meta, StoryObj } from '@storybook/react';

import Link from '@/shared/components/Link';
import GitHub from '@/shared/icons/GitHub';

export default {
    title: 'Shared/Components/Link',
    argTypes: {
        href: {
            type: 'string',
            description: 'Target URL to navigate to',
        },
    },
    component: Link,
} satisfies Meta<typeof Link>;

export const Default: StoryObj<typeof Link> = {
    args: {
        href: 'https://example.com/',
        children: 'Click me',
    },
};

export const Icon: StoryObj<typeof Link> = {
    args: {
        href: 'https://github.com/',
        children: <GitHub />,
    },
};
