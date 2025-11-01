import type { Entity } from '@/api/types';

export type CollisionType = Entity<{
    name: string;
    description: string;
    weight: number;
    filter: string;
    category: string;
}>;
