import { type ComponentPropsWithRef } from 'react';

import { Card, ProfilePicture } from '@/features/main/styles/AuthorCard.style';
import H from '@/shared/components/H';
import Link from '@/shared/components/Link';
import P from '@/shared/components/P';
import GitHub from '@/shared/icons/GitHub';
import LinkedIn from '@/shared/icons/LinkedIn';

export interface AuthorCardProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    imgUrl: string;
    name: string;
    description: string;
    linkedin: string;
    github: string;
}

/**
 * Main header for the landing page
 */
export const AuthorCard = ({
    imgUrl,
    name,
    description,
    linkedin,
    github,
    ...defaultProps
}: AuthorCardProps) => {
    return (
        <Card {...defaultProps}>
            <ProfilePicture
                id={`${name.replaceAll(' ', '-').toLowerCase()}-picture`}
                src={imgUrl}
                alt={`${name} picture`}
                width="175px"
            />

            <H level={4} bold>
                {name}
            </H>

            <P>{description}</P>

            <div>
                <Link aria-label="LinkedIn" href={linkedin}>
                    <LinkedIn />
                </Link>
                <Link aria-label="GitHub" href={github}>
                    <GitHub />
                </Link>
            </div>
        </Card>
    );
};
