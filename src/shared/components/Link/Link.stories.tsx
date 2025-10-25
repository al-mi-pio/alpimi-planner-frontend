import type { Meta, StoryObj } from '@storybook/react';

import Link from '@/shared/components/Link';
import GitHub from '@/shared/icons/GitHub';

export default {
    title: 'Shared/Components/Link',
    argTypes: {
        href: {
            description: 'Target URL to navigate to',
            type: {
                name: 'string',
                required: true,
            },
        },
        children: {
            description: 'A component that should be wrapped with the link',
            // @ts-expect-error ReactNode is ok
            type: 'string | ReactNode',
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
        'aria-label': 'GitHub',
    },
};
