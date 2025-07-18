import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fi from "./assets/fi.json";
import en from "./assets/en.json";

const resources = {
    fi: {
        translation: fi
    },
    en: {
        translation: en,
    },
}

i18n.use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'fi',
        lng: 'fi',
        detection: {
            order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
            caches: ['cookie'],
        },
    })

export default i18n;