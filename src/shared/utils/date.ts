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

export const addMinutesToTime = (time: string, minutes: number) => {
    const ms = minutes * 60 * 1000;
    const date = new Date(ms + Date.parse(`1970-01-01T${time}Z`));
    const [hours, min] = [date.getUTCHours(), date.getUTCMinutes()];

    return `${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}`;
};

export const getAdjustedDay = (stringDate: string) => {
    const day = new Date(stringDate).getUTCDay();
    return day ? day - 1 : 6;
};

export const getFirstDayOfWeek = (stringDate: string) => {
    const day = getAdjustedDay(stringDate);

    const date = new Date(Date.parse(stringDate) - 1000 * 60 * 60 * 24 * day);

    return date.toISOString().slice(0, 10);
};

export const addDaysToDate = (stringDate: string, days: number) => {
    const date = new Date(1000 * 60 * 60 * 24 * days + Date.parse(stringDate));

    return date.toISOString().slice(0, 10);
};

export const isBetweenDates = (
    date: string,
    startDate: string,
    endDate: string
) =>
    Date.parse(date) >= Date.parse(startDate) &&
    Date.parse(date) <= Date.parse(endDate);
