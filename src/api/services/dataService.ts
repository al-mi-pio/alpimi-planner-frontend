import axios from 'axios';

import type { Id } from '@/api/types';
import type { ExportGet, ImportPost } from '@/api/types/DataService';
import {
    catchApiErrors,
    getDefaultConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const dataUrl = `${apiUrl}/Data`;
export const importUrl = `${dataUrl}/import`;
export const exportUrl = (id: Id) => `${dataUrl}/export/${id}`;

export const exportGet: ExportGet = (id, config?) =>
    axios
        .get(exportUrl(id), getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);

export const importPost: ImportPost = (data, config?) =>
    axios
        .post(importUrl, data, getDefaultConfig(config))
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
