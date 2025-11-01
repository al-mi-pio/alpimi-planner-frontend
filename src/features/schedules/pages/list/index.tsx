import { useTranslation } from 'react-i18next';

import { ScheduleBlock } from '@/features/schedules/components/ScheduleBlock';
import { useScheduleData } from '@/features/schedules/hooks/useScheduleData';
import {
    ScheduleList,
    StyledDashboardPageContent,
} from '@/features/schedules/pages/list/index.style';
import Search from '@/shared/components/Search';

const SchedulesPage = () => {
    const { t } = useTranslation('schedules');

    const { schedules, isPending, bindSearch } = useScheduleData();

    return (
        <StyledDashboardPageContent title={t('My schedules')}>
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
        </StyledDashboardPageContent>
    );
};

export default SchedulesPage;
