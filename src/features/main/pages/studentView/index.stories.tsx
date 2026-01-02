import type { Meta, StoryObj } from '@storybook/react';

import StudentViewPage from '@/features/main/pages/studentView/index';
import PublicDashboard from '@/features/main/template';
import { studentViewDashboardHeader } from '@/features/schedules/constants';
import { PageStoryStyles } from '@/shared/styles/Stories';

export default {
    title: 'Pages/Student View',
    tags: ['!autodocs'],
    component: StudentViewPage,
    render: () => (
        <PublicDashboard
            headerProps={studentViewDashboardHeader(
                'mockUserUrl',
                'mockScheduleName'
            )}
        >
            <PageStoryStyles />
            <StudentViewPage />
        </PublicDashboard>
    ),
} satisfies Meta<typeof StudentViewPage>;

export const StudentView: StoryObj<typeof StudentViewPage> = {};
