import axios from 'axios';

import { ScheduleGetAll } from '@/api/types/ScheduleService';
import {
    catchApiErrors,
    getDefaultConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const scheduleUrl = `${apiUrl}/Schedule`;

export const scheduleGetAll: ScheduleGetAll = (config?) =>
    axios
        .get(scheduleUrl, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
