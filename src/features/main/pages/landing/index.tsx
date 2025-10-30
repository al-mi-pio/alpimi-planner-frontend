import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Hero } from '@/features/main/components/Hero';
import { MainHeader } from '@/features/main/components/MainHeader';
import { login } from '@/shared/constants/routes';

const LandingPage = () => {
    const navigate = useNavigate();

    const { t } = useTranslation('main');

    return (
        <>
            <MainHeader navigateTo={login} buttonLabel={t('Sign in')} />
            <Hero navigateTo={login} buttonLabel={t('Check it out')} />
        </>
    );
};

export default LandingPage;
