import { useTranslation } from 'react-i18next';

import { Authors } from '@/features/main/components/Authors';
import { Hero } from '@/features/main/components/Hero';
import { MainHeader } from '@/features/main/components/MainHeader';
import {
    Screenshot,
    StyledWrapper,
} from '@/features/main/styles/LandingPage.style';
import { login } from '@/shared/constants/routes';

const LandingPage = () => {
    const { t } = useTranslation('main');

    return (
        <StyledWrapper>
            <MainHeader navigateTo={login} buttonLabel={t('Sign in')} />
            <Hero navigateTo={login} buttonLabel={t('Check it out')} />
            <Screenshot
                id="alpimi-screenshot"
                src="/images/screenshot.webp"
                alt="Alpimi Planner screenshot"
                width="1300px"
            />
            <Authors />
        </StyledWrapper>
    );
};

export default LandingPage;
