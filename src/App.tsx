import { useTranslation } from 'react-i18next';

const App = () => {
    const { t } = useTranslation(['translation', 'common']);
    return <div>{t('Hello world')}</div>;
};

export default App;
