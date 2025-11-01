import { Icon } from '@/shared/icons/Icon.style';

const Clock = ({ secondary }: { secondary?: boolean }) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="-1 -1 32 32"
    >
        <path
            fill="currentColor"
            d="M15 3C8.373 3 3 8.373 3 15c0 6.627 5.373 12 12 12s12-5.373 12-12C27 8.373 21.627 3 15 3zm-1 13V6a1 1 0 012 0v8h6a1 1 0 010 2z"
        ></path>
    </Icon>
);

export default Clock;
