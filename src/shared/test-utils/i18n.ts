import { initReactI18next } from 'react-i18next';

// eslint-disable-next-line import-x/extensions
import english from '../../../public/locales/en/general.json';
// eslint-disable-next-line import-x/extensions
import polish from '../../../public/locales/pl/general.json';
import i18n from 'i18next';
import Backend from 'i18next-http-backend/cjs';

// eslint-disable-next-line import-x/no-named-as-default-member
i18n.use(initReactI18next)
    .use(Backend)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns: ['general'],
        defaultNS: 'general',
        debug: true,
        resources: { en: { general: english }, pl: { general: polish } },
    })
    .then(() => {});

export default i18n;
