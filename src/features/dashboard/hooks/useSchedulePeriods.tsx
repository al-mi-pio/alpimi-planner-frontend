import { use, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLoaderData } from 'react-router-dom';

import { AxiosError } from 'axios';

import { lessonPeriodGetAll } from '@/api/services/lessonPeriodService';
import { scheduleGetByName } from '@/api/services/scheduleService';
import type { ErrorResponse } from '@/api/types';
import { UserContext } from '@/features/auth/contexts';
import { useGetData } from '@/shared/hooks/useGetData';

export const useSchedulePeriods = () => {
    const { customURL } = use(UserContext);
    const { scheduleName } = useLoaderData();
    const navigate = useNavigate();

    const {
        data: schedule,
        isLoading: isScheduleLoading,
        error,
    } = useGetData({
        queryKey: ['schedule', customURL, scheduleName],
        queryFn: () => scheduleGetByName(customURL, scheduleName),
        select: (data) => data.content,
        retry: false,
        enabled: !!customURL && !!scheduleName,
    });

    const { data: lessonPeriods, isLoading: isLessonPeriodLoading } =
        useGetData({
            queryKey: ['lessonPeriod', schedule?.id],
            queryFn: () =>
                lessonPeriodGetAll({
                    params: {
                        scheduleId: schedule ? schedule.id : '0-0-0-0-0',
                    },
                }),
            select: (data) => data.content,
            enabled: !!schedule,
        });

    useEffect(() => {
        if (error) {
            const err = error as ErrorResponse | AxiosError;
            if (err.status === 404) navigate(-1);
        }
    }, [error]);

    return {
        schedule,
        lessonPeriods,
        isSchedulePeriodLoading: isScheduleLoading || isLessonPeriodLoading,
    };
};
