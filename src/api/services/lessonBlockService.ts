import axios from 'axios';

import type { LessonBlockGetAll } from '@/api/types/LessonBlockService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const lessonBlockUrl = `${apiUrl}/LessonBlock`;

export const lessonBlockGetAll: LessonBlockGetAll = (config?) =>
    axios
        .get(lessonBlockUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
