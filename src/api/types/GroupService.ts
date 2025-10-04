import { Entity } from '@/api/types';

export type Group = Entity<{
    name: string;
    studentCount: number;
}>;
