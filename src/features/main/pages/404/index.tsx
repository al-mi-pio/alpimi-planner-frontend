import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { AuthBodyStyles } from '@/features/auth/styles/Auth.style';
import { Abomination } from '@/features/main/components/Abomination';
import { Wrapper } from '@/features/main/styles/Page404.style';
import Button from '@/shared/components/Button';
import H from '@/shared/components/H';

const Page404 = () => {
    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
        <Wrapper>
            <AuthBodyStyles />
            <H level={2}>{t("This page doesn't exist")}</H>
            <Abomination />
            <Button
                appearance="secondary"
                label={t('Go back')}
                onClick={() => navigate(-1)}
            />
        </Wrapper>
    );
};

export default Page404;
