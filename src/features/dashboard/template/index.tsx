import { ReactNode } from 'react';

import {
    DashboardHeader,
    DashboardHeaderProps,
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
    <>
        <DashboardBodyStyles />
        <DashboardHeader navigation={[]} {...headerProps} />
        {!!children && <Content>{children}</Content>}
        <Toast />
    </>
);

export default Dashboard;
