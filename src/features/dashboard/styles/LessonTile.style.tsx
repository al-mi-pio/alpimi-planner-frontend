import styled from 'styled-components';

import { LessonTileStatus } from '@/features/dashboard/types';
import { sizes } from '@/shared/constants/dimensions';

export const StyledLessonTile = styled.button<{ $status: LessonTileStatus }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${sizes.small};
    padding: ${sizes.smallXL};
    border: none;
    border-radius: ${sizes.smallXL};
    text-align: center;
    background-color: ${({ theme, $status }) => {
        if ($status === LessonTileStatus.Overflowing) return theme.colors.error;
        if ($status === LessonTileStatus.Full) return theme.colors.success;
        if ($status === LessonTileStatus.Filled)
            return theme.colors.primaryAccent + '60';
        return theme.colors.primaryAccent;
    }};

    &:hover {
        background-color: ${({ theme, $status }) => {
            if ($status === LessonTileStatus.Overflowing)
                return theme.colors.error + '80';
            if ($status === LessonTileStatus.Full)
                return theme.colors.success + '80';
            if ($status === LessonTileStatus.Filled)
                return theme.colors.primaryAccent + 'B0';
            return theme.colors.primaryAccent + '80';
        }};
    }
`;
