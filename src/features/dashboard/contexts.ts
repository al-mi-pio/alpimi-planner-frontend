import { createContext, Dispatch, SetStateAction } from 'react';

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
