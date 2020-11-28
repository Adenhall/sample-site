import i18next from 'i18next';
import { en, vi } from './locales';

i18next
  .init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      }
    }
  })
  .then(() => {
    // console.log('i18n: ', i18next.t('hello'));
  });

export default i18next;
