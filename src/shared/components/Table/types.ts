import { ReactNode } from 'react';

export type CellValue = string | number | boolean | object | null | undefined;

export interface TableColumn {
    label: string;
    key: string;
    initialWidth?: number;
    renderFn?: (value: CellValue) => ReactNode;
}
