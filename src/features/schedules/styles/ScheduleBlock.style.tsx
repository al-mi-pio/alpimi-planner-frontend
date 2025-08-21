import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';
import { ButtonStyles } from '@/shared/styles/Common';

export const Block = styled.button`
    ${ButtonStyles('secondary')};
    & {
        width: 300px;
        height: 150px;
        background-color: ${({ theme }) => theme.colors.elementBackground};
        border-radius: ${sizes.small};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: ${sizes.small};
    }

    &:has(svg) {
        justify-content: center;
    }

    & > svg {
        width: 70px;
        height: 70px;
    }

    & > p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
`;
