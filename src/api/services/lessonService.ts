import axios from 'axios';

import type { Id } from '@/api/types';
import type { LessonGet, LessonGetAll } from '@/api/types/LessonService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const lessonUrl = `${apiUrl}/Lesson`;
export const lessonEntityUrl = (id: Id) => `${lessonUrl}/${id}`;

export const lessonGetAll: LessonGetAll = (config?) =>
    axios
        .get(lessonUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const lessonGet: LessonGet = (id, config?) =>
    axios
        .get(lessonEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
