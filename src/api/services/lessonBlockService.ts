import axios from 'axios';

import type { Id } from '@/api/types';
import type {
    LessonBlockDelete,
    LessonBlockGet,
    LessonBlockGetAll,
    LessonBlockPatch,
    LessonBlockPost,
} from '@/api/types/LessonBlockService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const lessonBlockUrl = `${apiUrl}/LessonBlock`;
export const lessonBlockEntityUrl = (id: Id) => `${lessonBlockUrl}/${id}`;

export const lessonBlockPost: LessonBlockPost = (data, config?) =>
    axios
        .post(lessonBlockUrl, data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const lessonBlockGetAll: LessonBlockGetAll = (config?) =>
    axios
        .get(lessonBlockUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const lessonBlockDelete: LessonBlockDelete = (id, config?) =>
    axios
        .delete(lessonBlockEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const lessonBlockPatch: LessonBlockPatch = ({ id, ...data }, config?) =>
    axios
        .patch(lessonBlockEntityUrl(id), data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const lessonBlockGet: LessonBlockGet = (id, config?) =>
    axios
        .get(lessonBlockEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
