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

export enum LessonTileStatus {
    Empty = 'empty',
    Filled = 'filled',
    Full = 'full',
    Overflowing = 'overflowing',
}

export type DroppedLesson = {
    weekDay: number;
    lessonStart: number;
    lessonEnd: number;
} & (
    | {
          lessonId: Id;
      }
    | {
          id: Id;
          clusterId: Id;
      }
);

export interface LessonBlockForm {
    weekDay: { label: string; value: string };
    lessonStart: string;
    lessonEnd: string;
    lesson: { label: string; value: string };
    classroom: { label: string; value: string };
    interval: boolean;
    weekInterval: string;
}
