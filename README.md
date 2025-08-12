# vite-app-import-lodash-circular-reference-issue

In the module file for vue-i18n multi-language support, a lodash method is imported with `import { floor } from 'lodash';`, but this lodash method is not used. After packaging with vite, it is found that tree-shaking does not work, and the entire lodash file is packaged into the final output JS. Moreover, after the vue app starts, the page goes blank, and no error messages are displayed in the browser console. Setting breakpoints in the output files reveals that the multi-language module JS imports the main JS file, and the methods in the main JS file dynamically import this multi-language module JS file, resulting in a circular reference issue.

this is `ZH-CN.js` , import floor function but not use

```js
import { floor } from 'lodash';
export default {
  content: '内容',
};
```

this is `i18n.js`

```js
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
```

this is `main.js`

```js
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import i18n from './i18n';

const app = createApp(App);
app.use(store);
app.use(i18n);

app.mount('#app');
```

this code fragment is in vite build main js (`dist\assets\index-wFQsXaez.js`) :

```js
const createI18nOptions = async () => {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getCurrentLocale;
  localeStore.getLocaleMap;
  const defaultLocal = await __variableDynamicImportRuntimeHelper(
    /* @__PURE__ */ Object.assign({
      './locales/en.js': () =>
        __vitePreload(
          () => import('./en-DZ0iot4c.js'),
          true ? [] : void 0,
          import.meta.url
        ),
      './locales/zh-CN.js': () =>
        __vitePreload(
          () => import('./zh-CN-bjSBKZ1p.js'),
          true ? [] : void 0,
          import.meta.url
        ),
      './locales/zh-TW.js': () =>
        __vitePreload(
          () => import('./zh-TW-mgeOf5EX.js'),
          true ? [] : void 0,
          import.meta.url
        ),
    }),
    `./locales/${locale.lang}.js`,
    3
  );
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
```

this is vite build `ZH-CN.js`:

```js
import './index-wFQsXaez.js';
const zhCN = {
  contene: '内容',
};
export { zhCN as default };
```

you can see `index-wFQsXaez.js` import `ZH-CH.js`, and `ZH-CN.js` import `index-wFQsXaez.js`, there is a circular reference issue.
