import axios from 'axios';

import type { StudentGetByAlbum } from '@/api/types/StudentService';
import {
    catchApiErrors,
    getDefaultConfig,
    parseAxiosResponse,
} from '@/api/utils';
import { apiUrl } from '@/shared/constants/configuration';

export const studentUrl = `${apiUrl}/Student`;
export const studentByAlbumEntityUrl = (
    scheduleId: string,
    albumNumber: string
) => `${studentUrl}/${scheduleId}/${albumNumber}`;

export const studentGetByAlbum: StudentGetByAlbum = (
    scheduleId,
    albumNumber,
    config?
) =>
    axios
        .get(
            studentByAlbumEntityUrl(scheduleId, albumNumber),
            getDefaultConfig(config)
        )
        .then(parseAxiosResponse)
        .catch(catchApiErrors);
