import type { Entity } from '@/api/types';

export type Teacher = Entity<{
    name: string;
    surname: string;
}>;
