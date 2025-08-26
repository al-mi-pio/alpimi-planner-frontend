import { scheduleGetAll } from '@/api/services/scheduleService';
import { useGetData } from '@/shared/hooks/useGetData';
import { useSearch } from '@/shared/hooks/useSearch';

export const useScheduleData = () => {
    const { isPending, data } = useGetData({
        queryKey: ['schedule'],
        queryFn: scheduleGetAll,
    });

    const { filteredData, bindSearch } = useSearch({
        data: data?.content || [],
        filterKey: 'name',
    });

    return { schedules: filteredData, isPending, bindSearch };
};
