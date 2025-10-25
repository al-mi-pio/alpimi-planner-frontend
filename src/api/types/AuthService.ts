import type {
    ApiCustomBodyService,
    ApiCustomBodylessService,
} from '@/api/types';

export interface AuthDTO {
    login: string;
    password: string;
}

export interface AuthResponse {
    content: string;
    timestamp: string;
    status: number;
}

export type AuthLogin = ApiCustomBodyService<AuthDTO, AuthResponse>;
export type AuthRefresh = ApiCustomBodylessService<AuthResponse>;
