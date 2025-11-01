import {
    type ApiCustomBodyService,
    type ApiGetService,
    DataEntityType,
    type ErrorMessage,
    type Id,
} from '@/api/types';

export interface ImportError {
    rowIndex: number;
    reason: ErrorMessage[];
}

export interface ImportDTO {
    scheduleId: Id;
    payload: string;
}

export interface ImportResponse {
    successfulItems: number;
    unsuccessfulItems: Record<DataEntityType, ImportError[]>;
}

export interface ExportResponse {
    payload: string;
}

export type ExportGet = ApiGetService<ExportResponse>;
export type ImportPost = ApiCustomBodyService<ImportDTO, ImportResponse>;
