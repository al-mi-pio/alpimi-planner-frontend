import { Icon } from '@/shared/icons/Icon.style';

const RightArrow = ({ secondary }: { secondary?: boolean }) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="-20 -10 420.004 420.004"
    >
        <path
            fill="currentColor"
            d="M318.2 217.314l-77.209 77.214c-6.764 6.76-6.764 17.726 0 24.485 6.764 6.764 17.73 6.764 24.484 0l106.768-106.77c6.764-6.76 6.764-17.727 0-24.485L265.475 80.983c-3.381-3.383-7.812-5.072-12.242-5.072s-8.861 1.689-12.242 5.072c-6.764 6.76-6.764 17.726 0 24.484L318.2 182.685H17.316C7.754 182.685 0 190.438 0 200s7.753 17.314 17.316 17.314Z"
        />
    </Icon>
);

export default RightArrow;
