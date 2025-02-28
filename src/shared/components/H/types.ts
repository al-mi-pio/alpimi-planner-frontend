import { PProps } from '@/shared/components/P/types';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HProps extends PProps {
    /**
     * Level of the heading, reflects the HTML \<h1\>, \<h2\>... etc. tags numeration
     */
    level: HeadingLevel;
}
