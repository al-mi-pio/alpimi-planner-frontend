import axios from 'axios';

import type { Id } from '@/api/types';
import type {
    ClassroomGet,
    ClassroomGetAll,
} from '@/api/types/ClassroomService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const classroomUrl = `${apiUrl}/Classroom`;
export const classroomEntityUrl = (id: Id) => `${classroomUrl}/${id}`;

export const classroomGetAll: ClassroomGetAll = (config?) =>
    axios
        .get(classroomUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const classroomGet: ClassroomGet = (id, config?) =>
    axios
        .get(classroomEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
