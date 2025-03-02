import { Icon } from '@/shared/icons/Icon.style';

const Calendar = ({ secondary }: { secondary?: boolean }) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="-10 -10 70 70"
    >
        <path
            fill="currentColor"
            d="M4 0H46Q50 0 50 4V46Q50 50 46 50H4Q0 50 0 46V4Q0 0 4 0ZM5 5V13H45V5ZM15 22A1 1 0 0020 22 1 1 0 0015 22M25 22A1 1 0 0030 22 1 1 0 0025 22M35 22A1 1 0 0040 22 1 1 0 0035 22M5 32A1 1 0 0010 32 1 1 0 005 32M15 32A1 1 0 0020 32 1 1 0 0015 32M25 32A1 1 0 0030 32 1 1 0 0025 32M35 32A1 1 0 0040 32 1 1 0 0035 32M5 42A1 1 0 0010 42 1 1 0 005 42M15 42A1 1 0 0020 42 1 1 0 0015 42M25 42A1 1 0 0030 42 1 1 0 0025 42Z"
        />
    </Icon>
);

export default Calendar;
