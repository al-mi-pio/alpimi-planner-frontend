import { Icon } from '@/shared/icons/Icon.style';

const Tag = ({ secondary }: { secondary?: boolean }) => (
    <Icon
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 0 36 36"
    >
        <path
            fill="currentColor"
            d="M33.2 19.1a1.9 1.9 0 010 2.7L24 31a1.9 1.9 0 01-2.7 0L31.8 20.4 16.1 5h2.1a1.9 1.9 0 011.4.5L33.2 19.1Z"
        ></path>
        <path
            fill="currentColor"
            d="M27.8 19.2 14.2 5.6A1.9 1.9 0 0012.8 5H3.6A1.9 1.9 0 001.7 6.9v9.2a1.9 1.9 0 00.6 1.4L15.8 31.1a1.9 1.9 0 002.7 0l9.2-9.2a1.9 1.9 0 00.1-2.7ZM6.7 11.7A1.7 1.7 0 118.4 10 1.7 1.7 0 016.7 11.7Z"
        ></path>
    </Icon>
);

export default Tag;
