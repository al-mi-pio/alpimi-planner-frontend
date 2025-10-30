import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Hero } from '@/features/main/components/Hero';
import { MainHeader } from '@/features/main/components/MainHeader';
import {
    Screenshot,
    StyledWrapper,
} from '@/features/main/styles/LandingPage.style';
import { login } from '@/shared/constants/routes';

const LandingPage = () => {
    const navigate = useNavigate();

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
        </StyledWrapper>
    );
};

export default LandingPage;
