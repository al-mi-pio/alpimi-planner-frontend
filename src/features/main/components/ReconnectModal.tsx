import { useTranslation } from 'react-i18next';

import { Abomination } from '@/features/main/components/Abomination';
import { Content } from '@/features/main/styles/ReconnectModal.style';
import Modal from '@/shared/components/Modal';
import P from '@/shared/components/P';

export const ReconnectModal = () => {
    const { t } = useTranslation('general');

    return (
        <Modal open={true} title={t('Network Error')}>
            <Content>
                <Abomination width={'100px'} />
                <P>{t('Trying to reconnect...')}</P>
            </Content>
        </Modal>
    );
};
