import { defineStore } from 'pinia';
import { store } from './store';

export const useLocaleStore = defineStore('locales', {
  state: () => {
    return {
      currentLocale: {
        lang: 'zh-CN',
        elLocale: 'zh-CN',
      },
      localeMap: [
        {
          lang: 'zh-CN',
          name: '简体中文',
        },
        {
          lang: 'en',
          name: 'English',
        },
        {
          lang: 'zh-TW',
          name: '繁體中文',
        },
      ],
    };
  },
  getters: {
    getCurrentLocale() {
      return this.currentLocale;
    },
    getLocaleMap() {
      return this.localeMap;
    },
  },
  actions: {
    setCurrentLocale(localeMap) {
      this.currentLocale.lang = localeMap?.lang;
    },
  },
});

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store);
};
