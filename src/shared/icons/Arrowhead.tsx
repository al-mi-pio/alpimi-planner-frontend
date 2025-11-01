import { Icon } from '@/shared/icons/Icon.style';

const arrowDirection = {
    right: 'M32 25 15 42a1 1 0 003 3L35 28q3-3 0-6L18 5A1 1 0 0015 8Z',
    left: 'M18 25 35 8a1 1 180 00-3-3L15 22q-3 3 0 6L32 45a1 1 180 003-3Z',
    up: 'M25 18 42 35a1 1-90 003-3L28 15q-3-3-6 0L5 32a1 1-90 003 3Z',
    down: 'M42 15a1 1 90 013 3L28 35q-3 3-6 0L5 18a1 1 90 013-3L25 32Z',
};

const Arrowhead = ({
    direction,
    secondary,
}: {
    direction?: keyof typeof arrowDirection;
    secondary?: boolean;
}) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="-5 -5 60 60"
    >
        <path fill="currentColor" d={arrowDirection[direction ?? 'right']} />
    </Icon>
);

export default Arrowhead;
