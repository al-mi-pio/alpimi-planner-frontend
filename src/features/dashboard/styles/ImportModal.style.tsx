import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${sizes.smallXL};
    padding-left: ${sizes.small};
    padding-right: ${sizes.regular};
    color: ${({ theme }) => theme.colors.primaryAccent};

    & p {
        margin: ${sizes.smallXL} 0;
    }

    & ul {
        margin-bottom: 2em;
    }
`;
