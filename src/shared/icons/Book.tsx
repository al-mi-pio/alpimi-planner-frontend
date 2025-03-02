import { Icon } from '@/shared/icons/Icon.style';

const Book = ({ secondary }: { secondary?: boolean }) => (
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
            d="M35 12v5H15V12Zm5-3q0-2-2-2H15q-5 0-5 5V40q0 4 4 4H40V42H15a1 1 0 01-1-6H38q2 0 2-2Z"
        />
    </Icon>
);

export default Book;
