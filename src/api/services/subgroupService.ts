import axios from 'axios';

import type { Id } from '@/api/types';
import type { SubgroupGet, SubgroupGetAll } from '@/api/types/SubgroupService';
import {
    catchApiErrors,
    getDefaultConfig,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const subgroupUrl = `${apiUrl}/Subgroup`;
export const subgroupEntityUrl = (id: Id) => `${subgroupUrl}/${id}`;

export const subgroupGetAll: SubgroupGetAll = (config?) =>
    axios
        .get(subgroupUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const subgroupGet: SubgroupGet = (id, config?) =>
    axios
        .get(subgroupEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
