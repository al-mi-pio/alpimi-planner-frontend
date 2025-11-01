import { Abomination } from '@/features/main/components/Abomination';
import { LoadingWrapper } from '@/features/main/styles/Loading.style';

export const Loading = ({
    width,
    height,
    ...defaultProps
}: {
    width?: string;
    height?: string;
}) => (
    <LoadingWrapper $width={width} $height={height} {...defaultProps}>
        <Abomination width={'80px'} />
    </LoadingWrapper>
);
