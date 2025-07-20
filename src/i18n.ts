import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// eslint-disable-next-line import-x/no-named-as-default-member
i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
        ns: ['general'],
        defaultNS: 'general',
        supportedLngs: ['pl', 'en-US'],
        fallbackLng: 'en-US',
        detection: {
            order: [
                'querystring',
                'cookie',
                'localStorage',
                'navigator',
                'htmlTag',
                'path',
                'subdomain',
            ],
            caches: ['localStorage'],
        },
    })
    .then();

export default i18n;
