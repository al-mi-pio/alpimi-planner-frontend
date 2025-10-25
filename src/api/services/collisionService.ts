import axios from 'axios';

import type { CollisionGetAll } from '@/api/types/CollisionService';
import {
    catchApiErrors,
    getDefaultGetAllConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const collisionUrl = `${apiUrl}/Collision`;

export const collisionGetAll: CollisionGetAll = (config?) =>
    axios
        .get(collisionUrl, getDefaultGetAllConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
