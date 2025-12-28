import { useQueryClient } from '@tanstack/react-query';
import { use, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { scheduleSettingsGet } from '@/api/services/scheduleSettingsService';
import { UserContext } from '@/features/auth/contexts';
import { DashboardPageContent } from '@/features/dashboard/components/DashboardPageContent';
import { useMutateScheduleSettings } from '@/features/dashboard/hooks/useMutateScheduleSettings';
import { useSchedulePeriods } from '@/features/dashboard/hooks/useSchedulePeriods';
import { FormWrapper } from '@/features/dashboard/styles/SettingsPage.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import { studentViewLink } from '@/features/dashboard/utils';
import Button from '@/shared/components/Button';
import LoadingBox from '@/shared/components/LoadingBox';
import P from '@/shared/components/P';
import { initialScheduleSetup } from '@/shared/constants/routes';
import { useGetData } from '@/shared/hooks/useGetData';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { customURL } = use(UserContext);
    const { t } = useTranslation(['dashboard']);
    const { schedule, lessonPeriods, isSchedulePeriodLoading } =
        useSchedulePeriods();
    const queryClient = useQueryClient();

    const onPatchSuccess = () => {
        queryClient
            .invalidateQueries({
                queryKey: ['scheduleSettings'],
            })
            .then(() => {
                queryClient
                    .refetchQueries({
                        queryKey: ['scheduleSettings'],
                    })
                    .then(() => {
                        toast.success(t('Settings changed successfully'));
                    });
            });
    };

    const { isPending, patch } = useMutateScheduleSettings({
        onPatchSuccess,
    });

    const { data: scheduleSettings, isLoading: isScheduleSettingsLoading } =
        useGetData({
            queryKey: ['scheduleSettings', schedule?.id],
            queryFn: () =>
                scheduleSettingsGet(schedule ? schedule.id : '0-0-0-0-0'),
            select: (data) => data.content,
            enabled: !!schedule,
        });

    useEffect(() => {
        if (schedule && lessonPeriods && !lessonPeriods.length) {
            navigate(initialScheduleSetup(schedule.name));
        }
    }, [lessonPeriods]);

    if (isSchedulePeriodLoading || isScheduleSettingsLoading)
        return <StyledLoading />;
    if (
        !lessonPeriods ||
        !scheduleSettings ||
        !schedule ||
        !lessonPeriods.length
    )
        return null;

    return (
        <DashboardPageContent title={t('Schedule settings')}>
            <LoadingBox loading={isPending}>
                <FormWrapper>
                    <P>
                        {scheduleSettings.isPublic
                            ? t('Schedule is currently visible for everyone')
                            : t('Schedule is currently hidden for everyone')}
                    </P>
                    <Button
                        label={
                            scheduleSettings.isPublic ? t('Hide') : t('Share')
                        }
                        disabled={isPending}
                        onClick={() =>
                            patch({
                                ...scheduleSettings,
                                id: schedule.id,
                                isPublic: !scheduleSettings.isPublic,
                            })
                        }
                    />
                    {scheduleSettings.isPublic && (
                        <P>
                            {t('Link for students')}
                            {studentViewLink(customURL, schedule.name)}
                        </P>
                    )}
                </FormWrapper>
            </LoadingBox>
        </DashboardPageContent>
    );
};

export default SettingsPage;
