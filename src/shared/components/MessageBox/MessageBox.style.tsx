import styled from 'styled-components';

import { getMessageBoxColors } from '@/shared/components/MessageBox/utils';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';
import { MessageType } from '@/shared/types';

export const StyledMessageBox = styled.div<{ $type: MessageType }>`
    display: grid;
    grid-template-columns: auto fit-content(100%);
    border: 2px solid ${({ $type, theme }) => getMessageBoxColors(theme)[$type]};
    border-radius: ${sizes.smallXL};
    height: fit-content;

    p {
        padding: ${sizes.small};
        color: ${({ $type, theme }) => getMessageBoxColors(theme)[$type]};
        font-size: ${fontSizes.regular};
        line-height: ${lineHeights.regular};
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 ${sizes.smallXL};
`;
