import axios from 'axios';

import type {
    ScheduleGetAll,
    ScheduleGetByName,
    SchedulePost,
} from '@/api/types/ScheduleService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const scheduleUrl = `${apiUrl}/Schedule`;
export const scheduleByNameEntityUrl = (customUrl: string, name: string) =>
    `${scheduleUrl}/${customUrl}/${name}`;

export const scheduleGetAll: ScheduleGetAll = (config?) =>
    axios
        .get(scheduleUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const schedulePost: SchedulePost = (data, config?) =>
    axios
        .post(scheduleUrl, data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const scheduleGetByName: ScheduleGetByName = (
    customUrl,
    name,
    config?
) =>
    axios
        .get(scheduleByNameEntityUrl(customUrl, name), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
