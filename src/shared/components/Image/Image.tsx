import { ImageProps } from '@/shared/components/Image/types';

/**
 * A UI component which renders an image
 */
const Image = ({ src, alt, ...defaultProps }: ImageProps) => (
    <img src={src} alt={alt} {...defaultProps} />
);

export default Image;
