import { Icon } from '@/shared/icons/Icon.style';

const LeftArrow = ({ secondary }: { secondary?: boolean }) => (
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
            d="M59.116 182.686l77.209-77.214c6.764-6.76 6.764-17.726 0-24.485-6.764-6.764-17.73-6.764-24.484 0L5.073 187.757c-6.764 6.76-6.764 17.727 0 24.485L111.841 319.017c3.381 3.383 7.812 5.072 12.242 5.072 4.43 0 8.861-1.689 12.242-5.072 6.764-6.76 6.764-17.726 0-24.484L59.116 217.315H360c9.562 0 17.316-7.753 17.316-17.315S369.563 182.686 360 182.686Z"
        />
    </Icon>
);

export default LeftArrow;
