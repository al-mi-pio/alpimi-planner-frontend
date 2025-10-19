import type { ApiGetAllService, Entity } from '@/api/types';
import type { Group } from '@/api/types/GroupService';
import type { Lesson } from '@/api/types/LessonService';

export type Subgroup = Entity<{
    name: string;
    studentCount: number;
    lessons: Lesson[];
    group: Group;
}>;

export type SubgroupGetAll = ApiGetAllService<Subgroup>;
