import { type ChangeEvent, useEffect, useId, useState } from 'react';

import { useDebounce } from 'use-debounce';

import { isContainedInOtherString } from '@/shared/utils/string';

export interface useSearchProps<T> {
    data: T[];
    filterKey: keyof T;
    debounceDelay?: number;
}

/**
 * Allows to bind a search input to filter data
 */
export const useSearch = <T = object,>({
    data,
    filterKey,
    debounceDelay = 280,
}: useSearchProps<T>) => {
    const [value, setValue] = useState('');
    const [text] = useDebounce(value, debounceDelay);
    const [filteredData, setFilteredData] = useState<T[]>(data);
    const id = useId();

    const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
        setValue(value);

    useEffect(() => {
        setFilteredData(
            data.filter((item) =>
                isContainedInOtherString(text, String(item[filterKey]))
            )
        );
    }, [text, data]);

    return {
        filteredData,
        bindSearch: {
            value,
            onChange,
            id,
        },
    };
};
