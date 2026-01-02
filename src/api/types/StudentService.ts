import type { AxiosRequestConfig } from 'axios';

import type { Entity, GetResponse } from '@/api/types';
import type { Group } from '@/api/types/GroupService';
import type { Subgroup } from '@/api/types/SubgroupService';

export type Student = Entity<{
    albumNumber: string;
    subgroups: Subgroup[];
    group: Group;
}>;

export type StudentGetByAlbum = (
    scheduleId: string,
    albumNumber: string,
    config?: AxiosRequestConfig
) => Promise<GetResponse<Student>>;
