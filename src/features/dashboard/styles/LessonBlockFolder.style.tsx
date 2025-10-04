import styled from 'styled-components';

import { LessonBlock } from '@/features/dashboard/components/LessonBlock';

export const Folder = styled.div<{ $open: boolean }>`
    display: flex;
    align-items: center;
    transition: max-width 150ms ease-out;
    ${({ $open, theme }) =>
        $open
            ? `position: absolute; background-color: ${theme.colors.primaryBackground}80; border-radius: 0.5em; max-width: 850px; z-index: 100; height: 130px; overflow-x: auto; &:has(> :nth-child(5)) { transform: translateY(5px); }`
            : 'position: relative; max-width: 190px;'};
`;
export const StyledLessonBlock = styled(LessonBlock)<{ $id: number | false }>`
    ${({ $id }) => {
        if ($id !== false) {
            switch ($id) {
                case 0:
                    return 'cursor: pointer; min-width: 165px; margin-right: 20px; z-index: 1; &:hover { transform: translateX(-2px); }';
                case 1:
                    return `cursor: pointer; min-width: 180px; height: 106px; margin-top: 2px; position: absolute; opacity: 0.5; &:hover { transform: none; }`;
                default:
                    return 'display: none;';
            }
        }
        return 'margin: 0 5px;';
    }}
`;
