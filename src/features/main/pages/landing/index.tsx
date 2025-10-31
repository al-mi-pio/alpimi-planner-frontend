import { useTranslation } from 'react-i18next';

import { useIsSignedIn } from '@/features/auth/hooks/useIsSignedIn';
import { Authors } from '@/features/main/components/Authors';
import { Contact } from '@/features/main/components/Contact';
import { Hero } from '@/features/main/components/Hero';
import { MainHeader } from '@/features/main/components/MainHeader';
import {
    Footer,
    Screenshot,
    StyledWrapper,
} from '@/features/main/styles/LandingPage.style';
import P from '@/shared/components/P';
import { login, schedules } from '@/shared/constants/routes';

const LandingPage = () => {
    const { t } = useTranslation('main');
    const { isSignedIn } = useIsSignedIn();

    return (
        <StyledWrapper>
            {isSignedIn ? (
                <>
                    <MainHeader
                        navigateTo={schedules}
                        buttonLabel={t('Launch')}
                    />
                    <Hero navigateTo={schedules} buttonLabel={t('Launch')} />
                </>
            ) : (
                <>
                    <MainHeader navigateTo={login} buttonLabel={t('Sign in')} />
                    <Hero navigateTo={login} buttonLabel={t('Check it out')} />
                </>
            )}
            <Screenshot
                id="alpimi-screenshot"
                src="/images/screenshot.webp"
                alt="Alpimi Planner screenshot"
                width="1300px"
            />
            <Authors />
            <Contact />
            <Footer>
                <P>{t('Copyright')}</P>
            </Footer>
        </StyledWrapper>
    );
};

export default LandingPage;
