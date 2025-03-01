import { ImageProps } from '@/shared/components/Image/types';

const Image = ({ src, alt, ...defaultProps }: ImageProps) => (
    <img src={src} alt={alt} {...defaultProps} />
);

export default Image;
