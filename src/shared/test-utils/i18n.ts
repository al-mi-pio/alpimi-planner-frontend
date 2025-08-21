import { initReactI18next } from 'react-i18next';

// eslint-disable-next-line import-x/extensions
import auth_en_us from '../../../public/locales/en-US/auth.json';
// eslint-disable-next-line import-x/extensions
import general_en_us from '../../../public/locales/en-US/general.json';
// eslint-disable-next-line import-x/extensions
import schedules_en_us from '../../../public/locales/en-US/schedules.json';
// eslint-disable-next-line import-x/extensions
import auth_pl from '../../../public/locales/pl/auth.json';
// eslint-disable-next-line import-x/extensions
import general_pl from '../../../public/locales/pl/general.json';
// eslint-disable-next-line import-x/extensions
import schedules_pl from '../../../public/locales/pl/schedules.json';
import i18n from 'i18next';
import Backend from 'i18next-http-backend/cjs';

// eslint-disable-next-line import-x/no-named-as-default-member
i18n.use(initReactI18next)
    .use(Backend)
    .init({
        lng: 'en-US',
        fallbackLng: 'en-US',
        ns: ['general', 'auth', 'schedules'],
        defaultNS: 'general',
        resources: {
            'en-US': {
                general: general_en_us,
                auth: auth_en_us,
                schedules: schedules_en_us,
            },
            pl: { general: general_pl, auth: auth_pl, schedules: schedules_pl },
        },
    })
    .then();

export default i18n;
