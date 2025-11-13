import { Icon } from '@/shared/icons/Icon.style';

const Pencil = ({ secondary }: { secondary?: boolean }) => (
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
            d="M30.1 10.7l8.7 8.7-22.1 22.1-8.6-8.7 22-22.1zm15.3-2.1-3.9-3.9c-1.5-1.5-3.9-1.5-5.4 0l-3.7 3.7 8.7 8.7 4.3-4.3c1.2-1.2 1.2-3 0-4.2zM3.5 45c-.2.7.5 1.4 1.2 1.2l9.7-2.4-8.7-8.7L3.5 45z"
        />
    </Icon>
);

export default Pencil;
