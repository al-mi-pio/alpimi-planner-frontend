import { Icon } from '@/shared/icons/Icon.style';

const Doors = ({ secondary }: { secondary?: boolean }) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 0 50 50"
    >
        <path
            fill="currentColor"
            d="M20.8 2.7V5.9H10.5v38H20.8v3.3l18.8-3.4V6.1L20.8 2.7Zm3.1 20.8c.6 0 1.1.7 1.1 1.5s-.5 1.5-1.1 1.5-1.1-.7-1.1-1.5.5-1.5 1.1-1.5ZM13.5 40.8V9h7.2V40.8H13.5Z"
        ></path>
    </Icon>
);

export default Doors;
