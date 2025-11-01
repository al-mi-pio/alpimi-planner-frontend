import type {
    ApiCustomBodyService,
    ApiCustomBodylessService,
    ServiceResponse,
} from '@/api/types';

export interface AuthDTO {
    login: string;
    password: string;
}

export interface AuthResponse extends ServiceResponse {
    content: string;
}

export type AuthLogin = ApiCustomBodyService<AuthDTO, AuthResponse>;
export type AuthRefresh = ApiCustomBodylessService<AuthResponse>;
