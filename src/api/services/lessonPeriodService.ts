import axios from 'axios';

import type { Id } from '@/api/types';
import type {
    LessonPeriodDelete,
    LessonPeriodGetAll,
    LessonPeriodPost,
} from '@/api/types/LessonPeriodService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const lessonPeriodUrl = `${apiUrl}/LessonPeriod`;
export const lessonPeriodEntityUrl = (id: Id) => `${lessonPeriodUrl}/${id}`;

export const lessonPeriodGetAll: LessonPeriodGetAll = (config?) =>
    axios
        .get(lessonPeriodUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const lessonPeriodPost: LessonPeriodPost = (data, config?) =>
    axios
        .post(lessonPeriodUrl, data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const lessonPeriodDelete: LessonPeriodDelete = (id, config?) =>
    axios
        .delete(lessonPeriodEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
