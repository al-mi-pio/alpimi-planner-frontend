import type { Meta, StoryObj } from '@storybook/react';

import styled from 'styled-components';

import {
    WindowWithTabs,
    type WindowWithTabsProps,
} from '@/features/dashboard/components/WindowWithTabs';
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

const CustomWindowWithTabs = ({ tabs, children }: WindowWithTabsProps) => (
    <Wrapper>
        <WindowWithTabs tabs={tabs}>{children}</WindowWithTabs>
    </Wrapper>
);

export default {
    title: 'Features/Dashboard/Components/WindowWithTabs',
    component: CustomWindowWithTabs,
    parameters: {
        docs: {
            description: {
                component: 'A window component with optional tabs handling',
            },
        },
    },
} satisfies Meta<typeof WindowWithTabs>;

export const ThreeTabs: StoryObj<typeof WindowWithTabs> = {
    args: {
        tabs: mockTabs,
    },
};

export const TwoTabs: StoryObj<typeof WindowWithTabs> = {
    args: {
        tabs: [mockTabs[0], mockTabs[1]],
    },
};

export const OneTab: StoryObj<typeof WindowWithTabs> = {
    args: {
        tabs: [mockTabs[0]],
    },
};

export const NoTabs: StoryObj<typeof WindowWithTabs> = {
    args: {
        tabs: [],
        children: mockTabs[0].content,
    },
};
