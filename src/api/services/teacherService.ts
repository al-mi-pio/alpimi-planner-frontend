import axios from 'axios';

import type { Teacher, TeacherGetAll } from '@/api/types/TeacherService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const getTeacherName = (teacher: Teacher) =>
    `${teacher.name} ${teacher.surname}`;

export const teacherUrl = `${apiUrl}/Teacher`;

export const teacherGetAll: TeacherGetAll = (config?) =>
    axios
        .get(teacherUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
