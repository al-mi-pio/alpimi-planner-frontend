import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react';

import styled from 'styled-components';

import H from '@/shared/components/H';
import Arrowhead from '@/shared/icons/Arrowhead';
import Book from '@/shared/icons/Book';
import Calendar from '@/shared/icons/Calendar';
import Clock from '@/shared/icons/Clock';
import Doors from '@/shared/icons/Doors';
import ErrorSign from '@/shared/icons/ErrorSign';
import GitHub from '@/shared/icons/GitHub';
import Group from '@/shared/icons/Group';
import LeftArrow from '@/shared/icons/LeftArrow';
import LinkedIn from '@/shared/icons/LinkedIn';
import Plus from '@/shared/icons/Plus';
import RightArrow from '@/shared/icons/RightArrow';
import Search from '@/shared/icons/Search';
import SortDown from '@/shared/icons/SortDown';
import Tag from '@/shared/icons/Tag';
import Trash from '@/shared/icons/Trash';
import UserCircle from '@/shared/icons/UserCircle';
import WarningSign from '@/shared/icons/WarningSign';
import X from '@/shared/icons/X';
import { StoryWrapper } from '@/shared/styles/Stories';

const Wrapper = styled.div<{ $secondary: boolean }>`
    padding: 1em;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 890px;
    background-color: ${(props) =>
        props.$secondary
            ? props.theme.colors.primaryAccent
            : props.theme.colors.elementBackground};
`;

export default {
    title: 'Shared/Icons',
    render: () => (
        <StoryWrapper>
            {[undefined, true].map((secondary, i) => (
                <Fragment key={i}>
                    <H level={2}>{secondary ? 'Secondary' : 'Default'}</H>
                    <Wrapper $secondary={!!secondary}>
                        <Calendar secondary={secondary} />
                        <Clock secondary={secondary} />
                        <GitHub secondary={secondary} />
                        <Group secondary={secondary} />
                        <LinkedIn secondary={secondary} />
                        <SortDown secondary={secondary} />
                        <UserCircle secondary={secondary} />
                        <Book secondary={secondary} />
                        <Doors secondary={secondary} />
                        <Trash secondary={secondary} />
                        <Tag secondary={secondary} />
                        <Search secondary={secondary} />
                        <Plus secondary={secondary} />
                        <Arrowhead secondary={secondary} direction="left" />
                        <Arrowhead secondary={secondary} direction="down" />
                        <Arrowhead secondary={secondary} direction="up" />
                        <Arrowhead secondary={secondary} />
                        <LeftArrow secondary={secondary} />
                        <RightArrow secondary={secondary} />
                        <X secondary={secondary} />

                        <WarningSign secondary={secondary} weight={0} />
                        <WarningSign secondary={secondary} weight={0.25} />
                        <WarningSign secondary={secondary} weight={0.5} />
                        <WarningSign secondary={secondary} weight={0.75} />
                        <WarningSign secondary={secondary} />
                        <ErrorSign />
                    </Wrapper>
                </Fragment>
            ))}
        </StoryWrapper>
    ),
} satisfies Meta;

export const Default: StoryObj = {
    parameters: {
        docs: {
            source: {
                code:
                    '// Add secondary="true" to any icon to change it\'s palette\n\n' +
                    '<Calendar />\n' +
                    '<Clock />\n' +
                    '<GitHub />\n' +
                    '<Group />\n' +
                    '<LinkedIn />\n' +
                    '<Plus />\n' +
                    '<SortDown />\n' +
                    '<UserCircle />\n' +
                    '<Book />\n' +
                    '<Search />\n' +
                    '<Arrowhead direction="left" />\n' +
                    '<Arrowhead direction="down" />\n' +
                    '<Arrowhead direction="up" />\n' +
                    '<Arrowhead />\n' +
                    '<LeftArrow />\n' +
                    '<RightArrow />\n' +
                    '<WarningSign weight={0} />\n' +
                    '<WarningSign weight={0.25} />\n' +
                    '<WarningSign weight={0.5} />\n' +
                    '<WarningSign weight={0.75} />\n' +
                    '<WarningSign />\n' +
                    '<ErrorSign />',
            },
        },
    },
};
