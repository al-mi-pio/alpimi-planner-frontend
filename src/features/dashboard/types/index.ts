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
    classroom: Status;
    teacher: Status;
    subgroups: Record<Id, Status>;
}

export interface SelectedEntity {
    id: Id;
    entity: EntityType;
}

export interface LessonBlockFilters {
    entityId?: Id;
    fromDate: string;
}
