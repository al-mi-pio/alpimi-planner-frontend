import axios from 'axios';

import type { ClassroomGetAll } from '@/api/types/ClassroomService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const classroomUrl = `${apiUrl}/Classroom`;

export const classroomGetAll: ClassroomGetAll = (config?) =>
    axios
        .get(classroomUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
