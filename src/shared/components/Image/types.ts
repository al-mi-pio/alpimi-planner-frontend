import { ComponentPropsWithRef } from 'react';

export interface ImageProps
    extends Omit<ComponentPropsWithRef<'img'>, 'children'> {
    src: string;
    alt: string;
}
