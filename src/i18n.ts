import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        ns: ['general'],
        defaultNS: 'general',
        supportedLngs: ['pl', 'en'],
        fallbackLng: 'pl',
        detection: {
            order: [
                'path',
                'cookie',
                'navigator',
                'htmlTag',
                'localStorage',
                'subdomain',
            ],
            caches: ['cookie'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;
