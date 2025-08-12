import { createI18n } from 'vue-i18n';
import { useLocaleStoreWithOut } from './locale';

const createI18nOptions = async () => {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getCurrentLocale;
  const localeMap = localeStore.getLocaleMap;
  const defaultLocal = await import(`./locales/${locale.lang}.js`);
  const message = defaultLocal.default ?? {};

  return {
    legacy: false,
    locale: locale.lang,
    fallbackLocale: locale.lang,
    messages: {
      [locale.lang]: message,
    },
  };
};

const option = await createI18nOptions();
const i18n = createI18n(option);

export default i18n;
