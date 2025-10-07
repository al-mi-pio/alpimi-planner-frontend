import { AxiosRequestConfig } from 'axios';

export type Id = `${string}-${string}-${string}-${string}-${string}`;
export type SortOrder = 'ASC' | 'DESC';

export type Entity<T = Record<string, unknown>> = T & {
    id: Id;
};

export interface ServiceResponse {
    status: number;
    timestamp: string;
}

export interface Pagination<T> extends ServiceResponse {
    totalItems: number;
    itemsPerPage: number;
    page: number;
    sortBy: keyof T;
    sortOrder: SortOrder;
}

export interface PostResponse extends ServiceResponse {
    content: Id;
}

export interface GetAllResponse<T> extends ServiceResponse {
    content: Entity<T>[];
    pagination: Pagination<T>;
}

export interface GetResponse<T> extends ServiceResponse {
    content: Entity<T>;
}

export type PatchResponse<T> = GetResponse<T>;

export interface ErrorMessage {
    field?: string;
    message: string;
}

export interface ErrorResponse extends ServiceResponse {
    errors: ErrorMessage[];
}

export type ErrorsState<T> = Partial<Record<keyof T, string>>;

export type ApiCustomBodyService<T, K> = (
    data: T,
    config?: AxiosRequestConfig
) => Promise<K>;

export type ApiCustomBodylessService<T> = (
    config?: AxiosRequestConfig
) => Promise<T>;

export type ApiPostService<T> = (
    data: T,
    config?: AxiosRequestConfig
) => Promise<PostResponse>;

export type ApiGetAllService<T> = (
    config?: AxiosRequestConfig
) => Promise<GetAllResponse<T>>;

export type ApiGetService<T> = (
    config?: AxiosRequestConfig
) => Promise<GetResponse<T>>;

export type ApiPatchService<T> = (
    config?: AxiosRequestConfig
) => Promise<PatchResponse<T>>;

export enum EntityType {
    Availability = 'availability',
    Classroom = 'classroom',
    ClassroomType = 'classroomType',
    Collision = 'collision',
    CollisionType = 'collisionType',
    DayOff = 'dayOff',
    Group = 'group',
    LessonBlock = 'lessonBlock',
    LessonPeriod = 'lessonPeriod',
    Lesson = 'lesson',
    LessonType = 'lessonType',
    Schedule = 'schedule',
    ScheduleSettings = 'scheduleSettings',
    Student = 'student',
    Subgroup = 'subgroup',
    Teacher = 'teacher',
    User = 'user',
}
