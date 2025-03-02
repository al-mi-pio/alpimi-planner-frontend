import { ComponentPropsWithRef } from 'react';

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
