export enum CollisionType {
    warning = 'warning',
    error = 'error',
    both = 'both',
}

export type TreeItemStatus = {
    type: CollisionType;
    inChildren?: boolean;
    weight?: number;
};
