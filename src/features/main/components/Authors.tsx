import { useTranslation } from 'react-i18next';

import {
    AuthorCard,
    type AuthorCardProps,
} from '@/features/main/components/AuthorCard';
import {
    CardWrapper,
    StyledAuthors,
    StyledP,
} from '@/features/main/styles/Authors.style';

export const Authors = () => {
    const { t } = useTranslation('main');
    const cards: AuthorCardProps[] = [
        {
            imgUrl: '/images/albert.webp',
            name: 'Albert Ząbkiewicz',
            description: t('Front-end software engineer product manager'),
            linkedin: 'https://www.linkedin.com/in/albert-z',
            github: 'https://github.com/ThePanToster',
        },
        {
            imgUrl: '/images/piotr.webp',
            name: 'Piotr Świszcz',
            description: t(
                'Back-end software engineer API developer task manager'
            ),
            linkedin: 'https://www.linkedin.com/in/piotr-świszcz-73a950258',
            github: 'https://github.com/piotr102k',
        },
        {
            imgUrl: '/images/mikolaj.webp',
            name: 'Mikołaj Szymanowski',
            description: t('Back-end software engineer UI designer'),
            linkedin:
                'https://www.linkedin.com/in/mikołaj-szymanowski-6821a0397',
            github: 'https://github.com/mikolajszyman',
        },
    ];
    return (
        <StyledAuthors>
            <StyledP id="about">{t('Meet the crew')}</StyledP>
            <CardWrapper>
                {cards.map((card, i) => (
                    <AuthorCard key={i} {...card} />
                ))}
            </CardWrapper>
        </StyledAuthors>
    );
};
