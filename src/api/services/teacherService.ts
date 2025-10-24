import axios from 'axios';

import type { Id } from '@/api/types';
import type {
    Teacher,
    TeacherGet,
    TeacherGetAll,
} from '@/api/types/TeacherService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const getTeacherName = (teacher: Teacher) =>
    `${teacher.name} ${teacher.surname}`;

export const teacherUrl = `${apiUrl}/Teacher`;
export const teacherEntityUrl = (id: Id) => `${teacherUrl}/${id}`;

export const teacherGetAll: TeacherGetAll = (config?) =>
    axios
        .get(teacherUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const teacherGet: TeacherGet = (id, config?) =>
    axios
        .get(teacherEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
