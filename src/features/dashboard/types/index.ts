import { EntityType, type Id } from '@/api/types';

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
    lessonBlock: Status;
    classroom: Status;
    teacher: Status;
    subgroups: Record<Id, Status>;
}

export interface SelectedEntity {
    id: Id;
    entity: EntityType;
}

export interface CurrentTimetableFilters {
    entityId: Id;
    entityName: string;
    fromDate: string;
    toDate: string;
}
