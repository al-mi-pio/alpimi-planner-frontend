import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: min-content;
    height: 100%;
`;

export const SingleTab = styled.div`
    background-color: ${({ theme }) => theme.colors.primaryBackground};
    flex-grow: 1;
    overflow: hidden;
    margin-right: ${sizes.small};
    max-width: fit-content;
    padding: ${sizes.smallXL};
    padding-right: ${sizes.small};
    color: ${({ theme }) => theme.colors.primaryText};
    border-top-right-radius: ${sizes.small};
    ${({ theme }) => theme.colors.elementBackground};
    box-shadow:
        0 2px ${({ theme }) => theme.colors.primaryBackground},
        2px 0 ${({ theme }) => theme.colors.elementBackground};
`;

export const Tab = styled.button`
    background-color: transparent;
    flex-grow: 1;
    overflow: hidden;
    border: none;
    padding: ${sizes.smallXL};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryText};

    &.selected {
        background-color: ${({ theme }) => theme.colors.primaryBackground};

        &:not(.right-tab) {
            border-top-right-radius: ${sizes.small};
            box-shadow:
                0 2px ${({ theme }) => theme.colors.primaryBackground},
                2px 0 ${({ theme }) => theme.colors.elementBackground};
        }

        &:not(.left-tab) {
            border-top-left-radius: ${sizes.small};
            box-shadow:
                0 2px ${({ theme }) => theme.colors.primaryBackground},
                -2px 0 ${({ theme }) => theme.colors.elementBackground};
        }

        &:not(.right-tab):not(.left-tab) {
            box-shadow:
                0 2px ${({ theme }) => theme.colors.primaryBackground},
                2px 0 ${({ theme }) => theme.colors.elementBackground},
                -2px 0 ${({ theme }) => theme.colors.elementBackground};
        }
    }
`;

export const Tabs = styled.div`
    background-color: ${({ theme }) => theme.colors.sectionBackground};
    display: flex;
    border-bottom: 2px solid ${({ theme }) => theme.colors.elementBackground};
`;

export const Content = styled.div`
    flex: 1;
    text-wrap: nowrap;
    overflow: auto;
    margin: ${sizes.smallXL};
`;
