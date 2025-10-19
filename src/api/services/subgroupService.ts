import axios from 'axios';

import type { SubgroupGetAll } from '@/api/types/SubgroupService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const subgroupUrl = `${apiUrl}/Subgroup`;

export const subgroupGetAll: SubgroupGetAll = (config?) =>
    axios
        .get(subgroupUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
