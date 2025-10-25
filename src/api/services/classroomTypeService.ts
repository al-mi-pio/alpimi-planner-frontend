import axios from 'axios';

import type { Id } from '@/api/types';
import type { ClassroomTypeGet } from '@/api/types/ClassroomTypeService';
import {
    catchApiErrors,
    getDefaultConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const classroomTypeUrl = `${apiUrl}/ClassroomType`;
export const classroomTypeEntityUrl = (id: Id) => `${classroomTypeUrl}/${id}`;

export const classroomTypeGet: ClassroomTypeGet = (id, config?) =>
    axios
        .get(classroomTypeEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
