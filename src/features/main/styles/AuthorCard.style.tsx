import styled from 'styled-components';

import Image from '@/shared/components/Image';
import { sizes } from '@/shared/constants/dimensions';

export const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.elementBackground};
    border-radius: 20px;
    padding: ${sizes.regular};
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${sizes.smallXL};
`;

export const ProfilePicture = styled(Image)`
    border-radius: 50%;
`;
