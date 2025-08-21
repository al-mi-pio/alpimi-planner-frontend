export const landingPage = '/';
export const login = '/login';
export const schedules = '/dashboard';
export const createSchedule = `${schedules}/create/schedule`;

export const editSchedule = (scheduleName: string) =>
    `${schedules}/schedule/${scheduleName}`;

export const viewSchedule = (scheduleName: string) =>
    `${editSchedule(scheduleName)}/view`;

export const scheduleData = (scheduleName: string) =>
    `${editSchedule(scheduleName)}/data`;

export const studentView = (userUrl: string, scheduleName: string) =>
    `/schedules/${userUrl}/${scheduleName}`;
