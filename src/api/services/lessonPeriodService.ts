import axios from 'axios';

import type { LessonPeriodGetAll } from '@/api/types/LessonPeriodService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const lessonPeriodUrl = `${apiUrl}/LessonPeriod`;

export const lessonPeriodGetAll: LessonPeriodGetAll = (config?) =>
    axios
        .get(lessonPeriodUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
