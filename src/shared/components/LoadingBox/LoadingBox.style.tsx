import styled from 'styled-components';

import { blink } from '@/shared/components/LoadingBox/constants';
import { sizes } from '@/shared/constants/dimensions';

export const EnabledBox = styled.fieldset`
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
`;

export const DisabledBox = styled(EnabledBox)`
    position: relative;
    filter: blur(1px);

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: ${sizes.smallXL};
        background-color: ${({ theme }) => theme.colors.elementBackground}60;
        box-shadow: 0 0 0 ${sizes.smallXL}
            ${({ theme }) => theme.colors.elementBackground}60;
        animation: ${blink} 2s linear infinite alternate;
    }

    & * {
        user-select: none;
    }
`;
