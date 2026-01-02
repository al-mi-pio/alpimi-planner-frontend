import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-mosaic-component/react-mosaic-component.css';
import { useNavigate } from 'react-router';

import { dayOffGetAll } from '@/api/services/dayOffService';
import { lessonBlockGetAll } from '@/api/services/lessonBlockService';
import { scheduleSettingsGet } from '@/api/services/scheduleSettingsService';
import { studentGetByAlbum } from '@/api/services/studentService';
import { CurrentTimetableFiltersContext } from '@/features/dashboard/contexts';
import { StyledLoading } from '@/features/dashboard/styles/Timetable.style';
import type { CurrentTimetableFilters } from '@/features/dashboard/types';
import { parseTimetableLessonBlocks } from '@/features/dashboard/utils';
import { usePublicSchedulePeriods } from '@/features/main/hooks/usePublicSchedulePeriods';
import {
    PageWrapper,
    StyledTimetable,
} from '@/features/main/styles/StudentViewPage.style';
import { schoolDaysFromDTO } from '@/features/schedules/utils';
import Button from '@/shared/components/Button';
import P from '@/shared/components/P';
import Text from '@/shared/components/Text';
import { useGetData } from '@/shared/hooks/useGetData';
import {
    addDaysToDate,
    getFirstDayOfWeek,
    isBetweenDates,
} from '@/shared/utils/date';

const StudentViewPage = () => {
    const [currentTimetableFilters, setCurrentTimetableFilters] =
        useState<CurrentTimetableFilters | null>(null);
    const navigate = useNavigate();
    const [albumNumber, setAlbumNumber] = useState('');
    const { t } = useTranslation(['main', 'fields']);
    const currentDate = new Date().toISOString();

    const { schedule, lessonPeriods, isSchedulePeriodLoading } =
        usePublicSchedulePeriods();

    const { data: scheduleSettings, isLoading: isScheduleSettingsLoading } =
        useGetData({
            queryKey: ['scheduleSettings', schedule?.id],
            queryFn: () =>
                scheduleSettingsGet(schedule ? schedule.id : '0-0-0-0-0'),
            select: (data) => ({
                ...data.content,
                schoolDays: schoolDaysFromDTO(data.content.schoolDays),
            }),
            enabled: !!lessonPeriods && !!lessonPeriods.length,
        });

    const { data: dayOffs, isLoading: isdayOffLoading } = useGetData({
        queryKey: ['dayOff', schedule?.id],
        queryFn: () =>
            dayOffGetAll({
                params: { scheduleId: schedule ? schedule.id : '0-0-0-0-0' },
            }),
        select: (data) => data.content,
        enabled: !!lessonPeriods && !!lessonPeriods.length,
    });

    const { data: lessonBlocks, isLoading: isLessonBlockLoading } = useGetData({
        queryKey: [
            'lessonBlock',
            currentTimetableFilters?.entityId,
            currentTimetableFilters?.fromDate,
        ],
        queryFn: () =>
            lessonBlockGetAll({
                params: {
                    id: currentTimetableFilters?.entityId,
                    fromDate: currentTimetableFilters?.fromDate,
                    toDate: currentTimetableFilters?.toDate,
                    sortBy: 'LessonDate',
                },
            }),
        select: (data) => data.content,
        enabled:
            !!currentTimetableFilters &&
            !!lessonPeriods &&
            !!lessonPeriods.length,
    });

    const {
        data: student,
        isLoading: isStudentLoading,
        refetch: fetchStudent,
    } = useGetData({
        queryKey: ['student', schedule?.id],
        queryFn: () =>
            studentGetByAlbum(
                schedule ? schedule.id : '0-0-0-0-0',
                albumNumber
            ),
        select: (data) => data.content,
        enabled: false,
    });

    const timetableLoading =
        isSchedulePeriodLoading ||
        isScheduleSettingsLoading ||
        isLessonBlockLoading ||
        isdayOffLoading;

    useEffect(() => {
        if (schedule && scheduleSettings && student) {
            setCurrentTimetableFilters({
                entityId: student.id,
                entityName: schedule.name,
                fromDate: getFirstDayOfWeek(
                    isBetweenDates(
                        currentDate,
                        scheduleSettings.schoolYearStart,
                        scheduleSettings.schoolYearEnd
                    )
                        ? currentDate
                        : scheduleSettings.schoolYearStart
                ),
                toDate: addDaysToDate(
                    getFirstDayOfWeek(
                        isBetweenDates(
                            currentDate,
                            scheduleSettings.schoolYearStart,
                            scheduleSettings.schoolYearEnd
                        )
                            ? currentDate
                            : scheduleSettings.schoolYearStart
                    ),
                    6
                ),
            });
            localStorage.setItem('albumNumber', student.albumNumber);
        }
    }, [schedule, student, scheduleSettings]);

    useEffect(() => {
        if (scheduleSettings && !scheduleSettings.isPublic) {
            navigate('404'); // TODO
        }
    }, [scheduleSettings]);

    useEffect(() => {
        const localAlbumNumber = localStorage.getItem('albumNumber');
        if (localAlbumNumber) {
            setAlbumNumber(localAlbumNumber);
        }
    }, []);

    if (isSchedulePeriodLoading) return <StyledLoading />;
    if (!lessonPeriods || !lessonPeriods.length) return null;

    return (
        <CurrentTimetableFiltersContext.Provider
            value={[currentTimetableFilters, setCurrentTimetableFilters]}
        >
            <PageWrapper>
                {timetableLoading ? (
                    <StyledLoading />
                ) : scheduleSettings &&
                  lessonBlocks &&
                  lessonPeriods &&
                  dayOffs ? (
                    <StyledTimetable
                        scheduleId={schedule && schedule.id}
                        lessonPeriods={lessonPeriods}
                        scheduleSettings={scheduleSettings}
                        dayOffs={dayOffs}
                        lessonBlocks={parseTimetableLessonBlocks(
                            lessonBlocks,
                            lessonPeriods,
                            [],
                            scheduleSettings.schoolDays,
                            true
                        )}
                    />
                ) : (
                    <P>
                        {t(
                            'Find your schedule by providing your album number below'
                        )}
                    </P>
                )}

                <Text
                    label={t('Album number', { ns: 'fields' })}
                    value={albumNumber}
                    onChange={({ target }) => setAlbumNumber(target.value)}
                />

                <Button
                    label={t('Search')}
                    disabled={
                        isStudentLoading || isLessonBlockLoading || !albumNumber
                    }
                    onClick={() => fetchStudent()}
                />
            </PageWrapper>
        </CurrentTimetableFiltersContext.Provider>
    );
};

export default StudentViewPage;
