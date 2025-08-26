import { ComponentPropsWithRef } from 'react';

import {
    Content,
    Title,
    Wrapper,
} from '@/features/dashboard/styles/DashboardPageContent.style';

export interface DashboardPageContentProps
    extends ComponentPropsWithRef<'div'> {
    title?: string;
}

/**
 * Dashboard page content
 */
export const DashboardPageContent = ({
    children,
    title,
}: DashboardPageContentProps) => {
    return (
        <Wrapper>
            <Title level={2} bold>
                {title}
            </Title>

            <Content>{children}</Content>
        </Wrapper>
    );
};
