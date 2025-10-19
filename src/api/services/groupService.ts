import axios from 'axios';

import type { GroupGetAll } from '@/api/types/GroupService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const groupUrl = `${apiUrl}/Group`;

export const groupGetAll: GroupGetAll = (config?) =>
    axios
        .get(groupUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
