export const apiUrl =
    String(import.meta.env.VITE_API_URL) || 'http://localhost:8080';
export const tokenRefreshFrequency =
    Number(import.meta.env.VITE_TOKEN_REFRESH_FREQUENCY_MS) || 4000;
