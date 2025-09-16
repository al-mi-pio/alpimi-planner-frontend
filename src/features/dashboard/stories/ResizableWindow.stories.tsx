import type { Meta, StoryObj } from '@storybook/react';

import styled from 'styled-components';

import {
    ResizableWindow,
    ResizableWindowProps,
} from '@/features/dashboard/components/ResizableWindow';
import P from '@/shared/components/P';

const Wrapper = styled.div`
    width: 600px;
    height: 300px;
`;

const mockTabs = [
    {
        id: 'groups',
        label: 'Grupy',
        content: (
            <>
                <P>
                    {Array(10)
                        .fill(true)
                        .map(
                            () =>
                                'lorem ipsum lorem ipsum lorem ipsum lorem ipsum '
                        )}
                </P>
                {Array(20)
                    .fill(true)
                    .map((_, i) => (
                        <P key={i}>{'lorem ipsum'}</P>
                    ))}
            </>
        ),
    },
    {
        id: 'teachers',
        label: 'Nauczyciele',
        content: <P>{'Test nauczycieli'}</P>,
    },
    {
        id: 'rooms',
        label: 'Sale',
        content: <P>{'Test sal'}</P>,
    },
];

const CustomResizableWindow = ({ tabs, children }: ResizableWindowProps) => (
    <Wrapper>
        <ResizableWindow tabs={tabs}>{children}</ResizableWindow>
    </Wrapper>
);

export default {
    title: 'Features/Dashboard/Components/ResizableWindow',
    component: CustomResizableWindow,
    parameters: {
        docs: {
            description: {
                component:
                    'A resizable window component with optional tabs handling',
            },
        },
    },
} satisfies Meta<typeof ResizableWindow>;

export const ThreeTabs: StoryObj<typeof ResizableWindow> = {
    args: {
        tabs: mockTabs,
    },
};

export const TwoTabs: StoryObj<typeof ResizableWindow> = {
    args: {
        tabs: [mockTabs[0], mockTabs[1]],
    },
};

export const OneTab: StoryObj<typeof ResizableWindow> = {
    args: {
        tabs: [mockTabs[0]],
    },
};

export const NoTabs: StoryObj<typeof ResizableWindow> = {
    args: {
        tabs: [],
        children: mockTabs[0].content,
    },
};
