import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import H from '@/shared/components/H';
import P from '@/shared/components/P';
import Search from '@/shared/components/Search';
import { useSearch } from '@/shared/hooks/useSearch';
import { mockColorData } from '@/shared/mocks/search';
import { StoryWrapper } from '@/shared/styles/Stories';

const Component = ({ debounceDelay }: { debounceDelay: number }) => {
    const [data] = useState(mockColorData);
    const { filteredData, bindSearch } = useSearch({
        data,
        filterKey: 'name',
        debounceDelay,
    });

    return (
        <StoryWrapper>
            <H level={4}>{'Wyszukaj kolor po nazwie'}</H>
            <Search {...bindSearch} />
            <StoryWrapper>
                {filteredData.map(({ name, description }) => (
                    <P key={name}>{name + ' - ' + description}</P>
                ))}
            </StoryWrapper>
        </StoryWrapper>
    );
};

/**
 * Allows to bind a search input to filter data
 */
export default {
    title: 'Shared/Hooks/useSearch',
    render: Component,
    argTypes: {
        debounceDelay: {
            description: 'Sets the debounce delay',
            table: { defaultValue: { summary: '280' } },
        },
    },
} satisfies Meta<typeof Component>;

export const Default: StoryObj = {
    parameters: {
        docs: {
            source: {
                code:
                    'const [data] = useState(colorData);\n' +
                    "const { filteredData, bindSearch } = useSearch({ data, filterKey: 'name' });\n" +
                    '\n' +
                    'return (\n' +
                    '    <>\n' +
                    '    <Search {...bindSearch} />\n' +
                    '    <div>\n' +
                    '      {filteredData.map(({ name, description }) => (\n' +
                    "                  <P key={name}>{name + ' - ' + description}</P>\n" +
                    '              ))}\n' +
                    '    </div>\n' +
                    '  </>\n' +
                    ');',
            },
        },
    },
    args: {
        debounceDelay: 100,
    },
};
