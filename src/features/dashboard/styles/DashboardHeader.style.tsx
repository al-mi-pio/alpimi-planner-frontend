import styled from 'styled-components';

import Button from '@/shared/components/Button';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const Wrapper = styled.div`
    display: grid;
    background-color: ${({ theme }) => theme.colors.elementBackground};
    grid: 1fr / repeat(3, 1fr);
`;

export const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    & svg {
        width: 35px;
        height: 35px;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    margin: 0 3%;

    & p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const User = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding-right: 5%;

    & > div > button {
        width: 45px;
        height: 45px;
        > svg {
            max-width: 35px;
            max-height: 35px;
        }
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: ${sizes.smallXL};
    padding: ${sizes.smallXL} 0;
`;

export const Spacer = styled.div`
    width: ${sizes.small};
`;

export const StyledButton = styled(Button)<{ $selected?: boolean }>`
    min-height: unset;
    max-height: 40px;
    min-width: unset;
    padding: ${sizes.smallXL} ${sizes.regular};
    ${({ $selected, theme }) =>
        $selected
            ? `background-color: ${theme.colors.primaryBackground}; border-color: transparent;`
            : ''};

    & p {
        font-size: ${fontSizes.regular};
        line-height: ${lineHeights.regular};
    }
`;
