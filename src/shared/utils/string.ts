import type { SortOrder } from '@/api/types';

export const isContainedInOtherString = (input: string, content: string) =>
    content.toLowerCase().includes(input.trim().toLowerCase());

export const capitalize = (input: string) =>
    input[0].toUpperCase() + input.slice(1);

export const sortBy =
    <T>(key: keyof T, order: SortOrder = 'ASC') =>
    (a: T, b: T) => {
        const nameA = String(a[key]).toLowerCase(),
            nameB = String(b[key]).toLowerCase();

        if (nameA < nameB) return order === 'ASC' ? -1 : 1;
        if (nameA > nameB) return order === 'ASC' ? 1 : -1;
        return 0;
    };
