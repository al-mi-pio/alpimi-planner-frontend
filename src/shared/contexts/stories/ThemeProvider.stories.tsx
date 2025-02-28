import { Meta, StoryObj } from '@storybook/react';
import { useContext } from 'react';

import styled from 'styled-components';

import Button from '@/shared/components/Button';
import H from '@/shared/components/H';
import Text from '@/shared/components/Text';
import { ThemeContext } from '@/shared/contexts/ThemeContext';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 6em;
    border: 2px solid ${(props) => props.theme.colors.primaryAccent};
    background-color: ${(props) => props.theme.colors.primaryBackground};
`;

const ChildComponent = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const oppositeTheme = theme === 'light' ? 'dark' : 'light';
    const handleThemeToggle = () => setTheme(oppositeTheme);

    return (
        <StyledWrapper>
            <H level={3}>{'Check out how setTheme() works'}</H>
            <Text label={`Current theme is ${theme}`} />
            <Button
                label={`Set theme to ${oppositeTheme}`}
                onClick={handleThemeToggle}
            />
        </StyledWrapper>
    );
};

export default {
    title: 'Shared/Contexts/ThemeContext',
    render: () => (
        <ThemeProvider>
            <ChildComponent />
        </ThemeProvider>
    ),
} satisfies Meta;

export const Default: StoryObj = {
    parameters: {
        docs: {
            source: {
                code:
                    '// Components must be inside <ThemeProvider>\n\n' +
                    'const { theme, setTheme } = useContext(ThemeContext);\n' +
                    '\n' +
                    'return (\n' +
                    '    <Button\n' +
                    "      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}\n" +
                    '  />\n' +
                    ');',
            },
        },
    },
};
