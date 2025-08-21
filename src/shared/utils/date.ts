import { getI18n } from 'react-i18next';

export const dateDifference = (date: string, newerDate?: string) => {
    const t = getI18n().t;
    const date1 = Date.parse(date);
    const date2 = newerDate ? Date.parse(newerDate) : Date.now();
    const diff = date2 - date1;

    if (diff < 60_000) return `${Math.round(diff / 1000)} s`;
    if (diff < 3_600_000) return `${Math.round(diff / 60_000)} min`;
    if (diff < 86_400_000)
        return t('{{count}} h', {
            count: Math.round(diff / 3_600_000),
        });
    if (diff < 604_800_000) return `${Math.round(diff / 86_400_000)} d`;
    if (diff < 2_592_000_000)
        return t('{{count}} wk', { count: Math.round(diff / 604_800_000) });

    if (diff < 31_536_000_000)
        return t('{{count}} mo.', {
            count: Math.round(diff / 2_592_000_000),
        });
    return t('{{count}} yr.', {
        count: Math.round(diff / 31_536_000_000),
    });
};
