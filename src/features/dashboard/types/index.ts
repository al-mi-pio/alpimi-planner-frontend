export interface NavButton {
    label: string;
    route: string;
}

export enum Status {
    'Normal' = 'normal',
    'Warning' = 'warning',
    'Error' = 'error',
}

export interface Statuses {
    classroom: Status;
    teacher: Status;
    subgroups: Status;
}
