import axios from 'axios';

import { ErrorResponse } from '@/api/types';
import { AuthLogin, AuthRefresh, AuthResponse } from '@/api/types/AuthService';
import { getDefaultConfig, parseAxiosResponse } from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const authUrl = `${apiUrl}/Auth`;
export const authLoginUrl = `${authUrl}/login`;
export const authRefreshUrl = `${authUrl}/refresh`;

export const authLogin: AuthLogin = (data, config?): Promise<AuthResponse> =>
    axios
        .post(authLoginUrl, data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch((error) => {
            throw error.response.data as ErrorResponse;
        });

export const authRefresh: AuthRefresh = (config?): Promise<AuthResponse> =>
    axios
        .get(authRefreshUrl, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch((error) => {
            throw error.response.data as ErrorResponse;
        });
