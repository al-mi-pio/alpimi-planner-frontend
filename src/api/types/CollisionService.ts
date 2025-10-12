import type { ApiGetAllService, Entity, Id } from '@/api/types';
import type { CollisionType } from '@/api/types/CollisionTypeService';

export type Collision = Entity<{
    collidingObject1: string; // Id | Date
    collidingObject2: Id | null;
    ignored: boolean;
    collisionType: CollisionType;
}>;

export type CollisionGetAll = ApiGetAllService<Collision>;
