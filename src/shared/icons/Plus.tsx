import { Icon } from '@/shared/icons/Icon.style';

const Plus = ({ secondary }: { secondary?: boolean }) => (
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
            d="M22 3a1 1 0 016 0V22H47a1 1 0 010 6H28V48a1 1 0 01-6 0V28H3a1 1 0 010-6H22Z"
        />
    </Icon>
);

export default Plus;
