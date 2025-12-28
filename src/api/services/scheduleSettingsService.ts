import axios from 'axios';

import type { Id } from '@/api/types';
import type {
    ScheduleSettingsGet,
    ScheduleSettingsPatch,
} from '@/api/types/ScheduleSettingsService';
import {
    catchApiErrors,
    getDefaultConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const scheduleSettingsUrl = `${apiUrl}/ScheduleSettings`;
export const scheduleSettingsEntityUrl = (id: Id) =>
    `${scheduleSettingsUrl}/${id}`;

export const scheduleSettingsGet: ScheduleSettingsGet = (id, config?) =>
    axios
        .get(scheduleSettingsEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const scheduleSettingsPatch: ScheduleSettingsPatch = (
    { id, ...data },
    config?
) =>
    axios
        .patch(scheduleSettingsEntityUrl(id), data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
