import axios from 'axios';

import type { Id } from '@/api/types';
import type { GroupGet, GroupGetAll } from '@/api/types/GroupService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const groupUrl = `${apiUrl}/Group`;
export const groupEntityUrl = (id: Id) => `${groupUrl}/${id}`;

export const groupGetAll: GroupGetAll = (config?) =>
    axios
        .get(groupUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const groupGet: GroupGet = (id, config?) =>
    axios
        .get(groupEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
