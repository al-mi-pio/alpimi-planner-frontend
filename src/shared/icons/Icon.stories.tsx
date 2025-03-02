import { Meta, StoryObj } from '@storybook/react';

import styled from 'styled-components';

import H from '@/shared/components/H';
import Arrowhead from '@/shared/icons/Arrowhead';
import Book from '@/shared/icons/Book';
import Calendar from '@/shared/icons/Calendar';
import Clock from '@/shared/icons/Clock';
import ErrorSign from '@/shared/icons/ErrorSign';
import GitHub from '@/shared/icons/GitHub';
import Group from '@/shared/icons/Group';
import LeftArrow from '@/shared/icons/LeftArrow';
import LinkedIn from '@/shared/icons/LinkedIn';
import Plus from '@/shared/icons/Plus';
import RightArrow from '@/shared/icons/RightArrow';
import Search from '@/shared/icons/Search';
import SortDown from '@/shared/icons/SortDown';
import UserCircle from '@/shared/icons/UserCircle';
import WarningSign from '@/shared/icons/WarningSign';

const Heading = styled(H)`
    margin-bottom: 0.5em;
`;

const Wrapper = styled.div<{ $secondary: boolean }>`
    margin-bottom: 2em;
    padding: 1em;
    background-color: ${(props) =>
        props.$secondary
            ? props.theme.colors.primaryAccent
            : props.theme.colors.elementBackground};
`;

export default {
    title: 'Shared/Icons',
    render: () => (
        <>
            {[undefined, true].map((secondary) => (
                <>
                    <Heading level={2}>
                        {secondary ? 'Secondary' : 'Default'}
                    </Heading>
                    <Wrapper $secondary={!!secondary}>
                        <Calendar secondary={secondary} />
                        <Clock secondary={secondary} />
                        <GitHub secondary={secondary} />
                        <Group secondary={secondary} />
                        <LinkedIn secondary={secondary} />
                        <Plus secondary={secondary} />
                        <SortDown secondary={secondary} />
                        <UserCircle secondary={secondary} />
                        <Book secondary={secondary} />
                        <Search secondary={secondary} />
                        <Arrowhead secondary={secondary} direction="left" />
                        <Arrowhead secondary={secondary} direction="down" />
                        <Arrowhead secondary={secondary} direction="up" />
                        <Arrowhead secondary={secondary} />
                        <LeftArrow secondary={secondary} />
                        <RightArrow secondary={secondary} />
                        <br />
                        <WarningSign secondary={secondary} weight={0} />
                        <WarningSign secondary={secondary} weight={0.25} />
                        <WarningSign secondary={secondary} weight={0.5} />
                        <WarningSign secondary={secondary} weight={0.75} />
                        <WarningSign secondary={secondary} />
                        <ErrorSign />
                    </Wrapper>
                </>
            ))}
        </>
    ),
} satisfies Meta;

export const Default: StoryObj = {};
