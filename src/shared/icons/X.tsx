import { Icon } from '@/shared/icons/Icon.style';

const X = ({ secondary }: { secondary?: boolean }) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="35"
        height="35"
        viewBox="0 0 30.5 30.5"
    >
        <path
            fill="currentColor"
            d="M16.71 15.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L10 18.98l3.75-3.75L10 11.48 11.48 10l3.75 3.75L18.98 10l1.48 1.48-3.75 3.75z"
        />
    </Icon>
);

export default X;
