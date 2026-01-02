import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import {
    Content,
    DashboardBodyStyles,
} from '@/features/dashboard/styles/Dashboard.style';
import type { DashboardProps } from '@/features/dashboard/template';
import Toast from '@/shared/components/Toast';

const PublicDashboard = ({ headerProps, children }: DashboardProps) => (
    <>
        <DashboardBodyStyles />
        <DashboardHeader navigation={[]} {...headerProps} />
        {!!children && <Content>{children}</Content>}
        <Toast />
    </>
);

export default PublicDashboard;
