import { Icon } from '@/shared/icons/Icon.style';

const Trash = ({ secondary }: { secondary?: boolean }) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="-5 -5 40 40"
    >
        <path
            fill="currentColor"
            d="M10 14.9a1.2 1 90 012 0v7.2a1.2 1 90 01-2 0Zm4 0a1.2 1 90 012 0v7.2a1.2 1 90 01-2 0Zm4 0a1.2 1 90 012 0v7.2a1.2 1 90 01-2 0ZM7.9 25.8a1.2 1 90 001 1.1H21.1a1.2 1 90 001-1.1L23 10.1H7l.9 15.7ZM25 6.5A1.2 1 90 0024 5.3H19V4.1A1.2 1 90 0018 2.9H12A1.2 1 90 0011 4.1V5.3H6A1.2 1 90 006 7.7H24a1.2 1 90 001-1.2Z"
        />
    </Icon>
);

export default Trash;
