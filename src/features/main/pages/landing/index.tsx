import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Hero } from '@/features/main/components/Hero';
import { MainHeader } from '@/features/main/components/MainHeader';

const LandingPage = () => {
    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
        <>
            <MainHeader />
            <Hero />
        </>
    );
};

export default LandingPage;
