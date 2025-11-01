import { StyledAbomination } from '@/features/main/styles/Abomination.style';

export const Abomination = ({ width = '400px' }: { width?: string }) => (
    <div>
        <StyledAbomination
            id="404-logo"
            src="/images/abomination.webp"
            alt="404 logo"
            width={width}
        />
    </div>
);
