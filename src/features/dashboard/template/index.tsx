import type { ReactNode } from 'react';

import { TokenRefreshProvider } from '@/features/auth/providers/TokenRefreshProvider';
import {
    DashboardHeader,
    type DashboardHeaderProps,
} from '@/features/dashboard/components/DashboardHeader';
import {
    Content,
    DashboardBodyStyles,
} from '@/features/dashboard/styles/Dashboard.style';
import Toast from '@/shared/components/Toast';

interface DashboardProps {
    children?: ReactNode;
    headerProps?: DashboardHeaderProps;
}

const Dashboard = ({ headerProps, children }: DashboardProps) => (
    <TokenRefreshProvider>
        <DashboardBodyStyles />
        <DashboardHeader navigation={[]} {...headerProps} />
        {!!children && <Content>{children}</Content>}
        <Toast />
    </TokenRefreshProvider>
);

export default Dashboard;
