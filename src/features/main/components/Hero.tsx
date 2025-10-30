import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    return (
        <StyledHero {...defaultProps}>
            <div>
                <StyledP>
                    {t('Planuj szybciej, lepiej, mądrzej z ')}
                    <Highlight>Alpimi</Highlight>
                </StyledP>
                <Button label={t('Check it out')} />
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
