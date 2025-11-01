import { login } from '@/shared/constants/routes';

export const tokenExpirationUrl = () => ({
    pathname: login,
    search:
        '?redirect=' +
        encodeURIComponent(
            location.search
                ? location.pathname + location.search
                : location.pathname
        ),
});
