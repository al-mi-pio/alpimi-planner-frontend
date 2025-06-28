import { useTranslation } from 'react-i18next';

const App = () => {
    const { t } = useTranslation();
    return <div>{t('Hello world')}</div>;
};

export default App;
