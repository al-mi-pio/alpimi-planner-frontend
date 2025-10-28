import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { scheduleSettingsGet } from '@/api/services/scheduleSettingsService';
import type { DeleteResponse, Id, PostResponse } from '@/api/types';
import type {
    CreateLessonPeriodDTO,
    LessonPeriod,
} from '@/api/types/LessonPeriodService';
import { DashboardPageContent } from '@/features/dashboard/components/DashboardPageContent';
import { useMutateLessonPeriod } from '@/features/dashboard/hooks/useMutateLessonPeriod';
import { useSchedulePeriods } from '@/features/dashboard/hooks/useSchedulePeriods';
import {
    FormWrapper,
    PeriodRow,
    StyledText,
} from '@/features/dashboard/styles/InitialSetupPage.style';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import { CreateScheduleMultiStep } from '@/features/schedules/components/CreateScheduleMultiStep';
import Button from '@/shared/components/Button';
import H from '@/shared/components/H';
import LoadingBox from '@/shared/components/LoadingBox';
import MessageBox from '@/shared/components/MessageBox';
import P from '@/shared/components/P';
import { editSchedule, scheduleData } from '@/shared/constants/routes';
import Plus from '@/shared/icons/Plus';
import Trash from '@/shared/icons/Trash';
import { MessageType } from '@/shared/types';
import { addMinutesToTime } from '@/shared/utils/date';
import { sortBy } from '@/shared/utils/string';

const InitialSetupPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(['dashboard', 'fields']);
    const { schedule, lessonPeriods, isSchedulePeriodLoading } =
        useSchedulePeriods();
    const [currentPeriods, setCurrentPeriods] = useState<LessonPeriod[]>([]);
    const [newPeriod, setNewPeriod] = useState('');

    const onPostSuccess = (
        { content }: PostResponse,
        { start }: CreateLessonPeriodDTO
    ) => {
        setCurrentPeriods((prev) => [
            ...prev,
            { id: content, start: start.slice(0, -3) },
        ]);
        setNewPeriod('');
    };

    const onDeleteSuccess = (_: DeleteResponse, id: Id) => {
        setCurrentPeriods((prev) => prev.filter((period) => period.id !== id));
    };

    const { post, remove, resetErrors, isPending, errors } =
        useMutateLessonPeriod({
            onPostSuccess,
            onDeleteSuccess,
        });

    const { data: scheduleSettings, isLoading: isScheduleSettingsLoading } =
        useQuery({
            queryKey: ['scheduleSettings'],
            queryFn: () =>
                scheduleSettingsGet(schedule ? schedule.id : '0-0-0-0-0'),
            select: (data) => data.content,
            enabled: !!lessonPeriods,
        });

    useEffect(() => {
        if (schedule && lessonPeriods && lessonPeriods.length) {
            navigate(editSchedule(schedule.name));
        }
    }, [lessonPeriods]);

    if (isSchedulePeriodLoading || isScheduleSettingsLoading)
        return <StyledLoading />;
    if (
        !lessonPeriods ||
        !scheduleSettings ||
        !schedule ||
        lessonPeriods.length
    )
        return null;

    const newPeriodEndTime = addMinutesToTime(
        newPeriod,
        scheduleSettings.schoolHour
    );

    return (
        <DashboardPageContent title={t('Lesson periods')}>
            <FormWrapper>
                <CreateScheduleMultiStep currentStep={1} />
                <LoadingBox
                    style={{
                        width: 'auto',
                    }}
                    loading={isPending}
                >
                    {currentPeriods
                        .toSorted(sortBy('start'))
                        .map(({ id, start }, i) => (
                            <PeriodRow key={id} style={{ width: '100%' }}>
                                <P>{t('Lesson {{count}}', { count: i + 1 })}</P>

                                <P>{`${start} - ${addMinutesToTime(start, scheduleSettings.schoolHour)}`}</P>

                                <Button
                                    icon={<Trash />}
                                    appearance="secondary"
                                    disabled={isPending}
                                    onClick={() => remove(id)}
                                />
                            </PeriodRow>
                        ))}
                    <PeriodRow style={{ marginTop: '1em' }}>
                        <H level={5}>
                            {t('Lesson {{count}}', {
                                count: currentPeriods.length + 1,
                            })}
                        </H>
                        <P>{t('from')}</P>
                        <StyledText
                            maxLength={5}
                            label={t('Lesson start', { ns: 'fields' })}
                            name="lesson-start"
                            value={newPeriod}
                            error={errors.start}
                            onChange={({ target }) => {
                                setNewPeriod(target.value);
                                if (Object.keys(errors).length) resetErrors();
                            }}
                        />
                        <P>{t('to')}</P>
                        <P>
                            {newPeriodEndTime === 'NaN:NaN'
                                ? '??:??'
                                : newPeriodEndTime}
                        </P>

                        <Button
                            icon={<Plus />}
                            appearance="secondary"
                            disabled={
                                newPeriodEndTime === 'NaN:NaN' || isPending
                            }
                            onClick={() =>
                                post({
                                    scheduleId: schedule.id,
                                    start: `${newPeriod}:00`,
                                })
                            }
                        />
                    </PeriodRow>

                    {newPeriodEndTime === 'NaN:NaN' && (
                        <MessageBox
                            style={{ width: '100%' }}
                            type={MessageType.info}
                            noClosing
                        >
                            {t('Provide time in HHMM format')}
                        </MessageBox>
                    )}
                </LoadingBox>
            </FormWrapper>
            <Button
                label={t('Finish')}
                disabled={!currentPeriods.length || isPending}
                style={{ marginLeft: 'auto' }}
                onClick={() =>
                    navigate({
                        pathname: scheduleData(schedule.name),
                        search: '?firstTime=true',
                    })
                }
            />
        </DashboardPageContent>
    );
};

export default InitialSetupPage;
