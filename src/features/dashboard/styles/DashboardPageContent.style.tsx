import styled from 'styled-components';

import H from '@/shared/components/H';
import { sizes } from '@/shared/constants/dimensions';

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: ${sizes.large};
    margin: 0 ${sizes.largeXL};
`;

export const Content = styled.div`
    background-color: ${({ theme }) => theme.colors.sectionBackground};
    padding: ${sizes.regular};
    display: flex;
    flex-direction: column;
    gap: ${sizes.regular};
    border-radius: ${sizes.smallXL};
`;

export const Title = styled(H)`
    margin-bottom: ${sizes.smallXL};
`;
