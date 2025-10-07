import {
    ErrorInChildrenIcon,
    StatusIconsWrapper,
    WarningInChildrenIcon,
} from '@/shared/components/Tree/styles/TreeItemStatusIcon.style';
import {
    CollisionType,
    type TreeItemStatus,
} from '@/shared/components/Tree/types';
import ErrorSign from '@/shared/icons/ErrorSign';
import WarningSign from '@/shared/icons/WarningSign';

export const TreeItemStatusIcon = ({ status }: { status: TreeItemStatus }) => (
    <StatusIconsWrapper>
        {status &&
            (status.type === CollisionType.error ||
                status.type === CollisionType.both) &&
            (status.inChildren ? <ErrorInChildrenIcon /> : <ErrorSign />)}

        {status &&
            (status.type === CollisionType.warning ||
                status.type === CollisionType.both) &&
            (status.inChildren ? (
                <WarningInChildrenIcon $weight={status.weight ?? 1} />
            ) : (
                <WarningSign weight={status.weight} />
            ))}
    </StatusIconsWrapper>
);
