import { createContext, type Dispatch, type SetStateAction } from 'react';

import { defaultLessonBlockFilters } from '@/features/dashboard/constants';
import type {
    LessonBlockFilters,
    SelectedEntity,
} from '@/features/dashboard/types';

export const OpenFoldersContext = createContext<
    [
        {
            [p: string]: boolean;
        },
        Dispatch<
            SetStateAction<{
                [p: string]: boolean;
            }>
        >,
    ]
>([{}, () => ({})]);

export const HoveredBlockIdContext = createContext<string | null>(null);
export const PropertiesWindowContext = createContext<
    [SelectedEntity | null, Dispatch<SetStateAction<SelectedEntity | null>>]
>([null, () => null]);
export const LessonBlockFiltersContext = createContext<
    [LessonBlockFilters, Dispatch<SetStateAction<LessonBlockFilters>>]
>([defaultLessonBlockFilters, () => {}]);
