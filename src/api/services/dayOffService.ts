import axios from 'axios';

import type { DayOffGetAll } from '@/api/types/DayOffService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const dayOffUrl = `${apiUrl}/DayOff`;

export const dayOffGetAll: DayOffGetAll = (config?) =>
    axios
        .get(dayOffUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
