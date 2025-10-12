import axios from 'axios';

import type { Id } from '@/api/types';
import type { UserGet } from '@/api/types/UserService';
import {
    catchApiErrors,
    getDefaultConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const userUrl = `${apiUrl}/User`;
export const userEntityUrl = (id: Id) => `${userUrl}/${id}`;

export const userGet: UserGet = (id, config?) =>
    axios
        .get(userEntityUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
