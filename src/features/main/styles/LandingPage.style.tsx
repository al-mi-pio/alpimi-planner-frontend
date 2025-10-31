import styled from 'styled-components';

import Image from '@/shared/components/Image';
import { sizes } from '@/shared/constants/dimensions';

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Screenshot = styled(Image)`
    margin: ${sizes.largeXL} auto;
`;

export const Footer = styled.footer`
    background-color: ${({ theme }) =>
        `color-mix(in srgb, ${theme.colors.sectionBackground} 50%, black 50%);`};
    padding: ${sizes.regular} 0;
    text-align: center;
`;
