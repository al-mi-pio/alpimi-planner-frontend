export const landingPage = '/';
export const login = '/login';
export const resetPassword = '/resetpassword';
export const schedules = '/dashboard';
export const createSchedule = `${schedules}/create/schedule`;

export const editSchedule = (scheduleName: string) =>
    `${schedules}/schedule/${scheduleName}`;

export const scheduleSettings = (scheduleName: string) =>
    `${editSchedule(scheduleName)}/settings`;

export const scheduleData = (scheduleName: string) =>
    `${editSchedule(scheduleName)}/data`;

export const initialScheduleSetup = (scheduleName: string) =>
    `${editSchedule(scheduleName)}/initialSetup`;

export const studentView = (userUrl: string, scheduleName: string) =>
    `/schedules/${userUrl}/${scheduleName}`;
