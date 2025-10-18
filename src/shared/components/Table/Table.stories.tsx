import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { Id } from '@/api/types';
import P from '@/shared/components/P';
import Table from '@/shared/components/Table';
import type { TableProps } from '@/shared/components/Table/Table';
import type { TableColumn } from '@/shared/components/Table/types';
import { StoryWrapper } from '@/shared/styles/Stories';
import { warningIconRenderFn } from '@/shared/utils/table';

const data = [
    {
        id: 0,
        weight: 0.3,
        name: 'Example name 1',
        boolean: true,
        amount: 123,
    },
    {
        id: 1,
        weight: 0,
        name: 'Example name 2',
        empty: null,
        boolean: true,
        amount: 12678567,
    },
    {
        id: 2,
        weight: 1,
        name: 'Example name 3',
        empty: undefined,
        boolean: false,
        amount: 0,
    },
    {
        id: 3,
        weight: 0.9,
        name: 'Example name 4',
        empty: {},
        boolean: true,
        amount: -14.678,
    },
];

const columns: TableColumn[] = [
    { label: '', key: 'weight', renderFn: warningIconRenderFn },
    { label: 'Name', key: 'name' },
    { label: 'Empty value', key: 'empty' },
    { label: 'Boolean', key: 'boolean' },
    { label: 'Amount', key: 'amount' },
];

const CustomTable = (props: TableProps) => {
    const [selectedItem, setSelectedItem] = useState<Id | undefined>();

    return (
        <StoryWrapper>
            <Table
                selectedItem={selectedItem}
                onSelectItem={setSelectedItem}
                onBlur={() => setSelectedItem(undefined)}
                {...props}
            />
            <P>{`Current selected item id: ${selectedItem}`}</P>
        </StoryWrapper>
    );
};

export default {
    title: 'Shared/Components/Table',
    component: Table,
    render: CustomTable,
} satisfies Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
    args: {
        data,
        columns,
    },
};
