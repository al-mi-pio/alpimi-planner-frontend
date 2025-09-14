import { useTranslation } from 'react-i18next';

import { DashboardPageContent } from '@/features/dashboard/components/DashboardPageContent';
import { ScheduleBlock } from '@/features/schedules/components/ScheduleBlock';
import { useScheduleData } from '@/features/schedules/hooks/useScheduleData';
import { ScheduleList } from '@/features/schedules/pages/list/index.style';
import Search from '@/shared/components/Search';

const SchedulesPage = () => {
    const { t } = useTranslation('schedules');

    const { schedules, isPending, bindSearch } = useScheduleData();

    return (
        <DashboardPageContent title={t('My schedules')}>
            <Search {...bindSearch} disabled={isPending} />
            <ScheduleList loading={isPending}>
                {!!schedules.length &&
                    schedules.map(({ name, id, modifyDate }) => (
                        <ScheduleBlock
                            name={name}
                            key={id}
                            modifyDate={modifyDate}
                        />
                    ))}
                <ScheduleBlock />
            </ScheduleList>
        </DashboardPageContent>
    );
};

export default SchedulesPage;
