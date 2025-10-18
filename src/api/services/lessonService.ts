import axios from 'axios';

import type { LessonGetAll } from '@/api/types/LessonService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const lessonUrl = `${apiUrl}/Lesson`;

export const lessonGetAll: LessonGetAll = (config?) =>
    axios
        .get(lessonUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
