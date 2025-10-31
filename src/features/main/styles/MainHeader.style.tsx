import styled from 'styled-components';

import Link from '@/shared/components/Link';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const Header = styled.header`
    background-color: ${({ theme }) =>
        `color-mix(in srgb, ${theme.colors.sectionBackground} 50%, black 50%);`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${sizes.smallXL} 0;
    padding-left: ${sizes.regular};
    padding-right: ${sizes.large};
`;

export const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${sizes.large};

    @media (max-width: 800px) {
        flex-direction: column;
        gap: ${sizes.small};
        padding: ${sizes.small} 0;
    }
`;

export const NavLink = styled(Link)`
    & > p {
        color: white;
        font-size: ${fontSizes.largeXL};
        line-height: ${lineHeights.largeXL};
    }
`;
