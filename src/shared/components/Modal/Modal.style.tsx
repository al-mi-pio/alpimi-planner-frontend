import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const StyledModal = styled.dialog`
    background-color: ${({ theme }) => theme.colors.sectionBackground};
    border: none;
    display: flex;
    flex-direction: column;
    gap: ${sizes.smallXL};
    min-width: 300px;
    min-height: 200px;
    max-height: 85vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &::backdrop {
        background: rgba(0, 0, 0, 0.5);
    }
`;

export const ModalHeader = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    & > p {
        padding: ${sizes.smallXL};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const ModalContent = styled.div`
    flex: 1;
    overflow: auto;
`;

export const ModalFooter = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    padding-top: ${sizes.smallXL};
`;
