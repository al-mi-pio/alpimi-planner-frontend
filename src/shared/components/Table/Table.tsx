import { ComponentPropsWithRef } from 'react';

import { Row, StyledTable } from '@/shared/components/Table/Table.style';
import { CellValue, TableColumn } from '@/shared/components/Table/types';
import { defaultFormatter } from '@/shared/utils/table';

export interface TableProps extends ComponentPropsWithRef<'table'> {
    /**
     * A configuration of columns
     */
    columns: TableColumn[];
    /**
     * The data to display
     */
    data: Record<string, CellValue>[];
    /**
     * A value used to select and deselect an item
     */
    selectedItem?: string;
    /**
     * An event that runs on selecting an item
     */
    onSelectItem?: (value?: string) => void;
}

/**
 * A UI component used to display two-dimensional data
 */
export const Table = ({
    columns,
    data,
    selectedItem,
    onSelectItem,
    ...defaultProps
}: TableProps) => {
    return (
        <StyledTable {...defaultProps}>
            <thead>
                <tr>
                    {columns.map(({ label, key }) => (
                        <th key={key} scope="col">
                            {label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, i) => (
                    <Row
                        key={i}
                        onClick={() =>
                            onSelectItem && onSelectItem(String(row.id))
                        }
                        tabIndex={0}
                        className={
                            selectedItem && String(row.id) === selectedItem
                                ? 'selected'
                                : ''
                        }
                    >
                        {columns.map(
                            ({ key, renderFn = defaultFormatter }, j) => (
                                <td key={j}>{renderFn(row[key])}</td>
                            )
                        )}
                    </Row>
                ))}
            </tbody>
        </StyledTable>
    );
};
