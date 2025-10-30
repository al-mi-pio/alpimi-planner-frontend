import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { MainHeaderProps } from '@/features/main/components/MainHeader';
import {
    StyledHero,
    StyledP,
    Highlight,
} from '@/features/main/styles/Hero.style';
import Button from '@/shared/components/Button';
import Image from '@/shared/components/Image';

export type HeroProps = MainHeaderProps;

/**
 * Main hero component for the landing page
 */
export const Hero = ({
    navigateTo,
    buttonLabel,
    ...defaultProps
}: HeroProps) => {
    const { t } = useTranslation('main');
    const navigate = useNavigate();
    return (
        <StyledHero {...defaultProps}>
            <div>
                <StyledP>
                    {t('Plan better faster smarter with ')}
                    <Highlight>Alpimi</Highlight>
                </StyledP>
                <Button
                    label={buttonLabel}
                    onClick={() => navigate(navigateTo)}
                />
            </div>
            <div>
                <Image
                    id="boxes-image"
                    src="/images/landing_icon.webp"
                    alt="Alpimi Planner logo"
                    width="430px"
                />
            </div>
        </StyledHero>
    );
};
