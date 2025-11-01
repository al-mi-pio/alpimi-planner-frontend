import axios from 'axios';

import type {
    AuthLogin,
    AuthRefresh,
    AuthResponse,
} from '@/api/types/AuthService';
import {
    catchApiErrors,
    getDefaultConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const authUrl = `${apiUrl}/Auth`;
export const authLoginUrl = `${authUrl}/login`;
export const authRefreshUrl = `${authUrl}/refresh`;

export const authLogin: AuthLogin = (data, config?): Promise<AuthResponse> =>
    axios
        .post(authLoginUrl, data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const authRefresh: AuthRefresh = (config?): Promise<AuthResponse> =>
    axios
        .get(authRefreshUrl, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
