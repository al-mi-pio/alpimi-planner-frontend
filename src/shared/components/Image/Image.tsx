import type { ComponentPropsWithRef } from 'react';

export interface ImageProps
    extends Omit<ComponentPropsWithRef<'img'>, 'children'> {
    /**
     * Url or path to the image
     */
    src: string;
    /**
     * Alternative text that describes the image
     */
    alt: string;
}

/**
 * A UI component which renders an image
 */
const Image = ({ src, alt, ...defaultProps }: ImageProps) => (
    <img src={src} alt={alt} {...defaultProps} />
);

export default Image;
