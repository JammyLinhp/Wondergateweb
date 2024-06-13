import { createSSRApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import http from './utils/http';
import './styles/main.less';
import './style.css';
import * as Icons from '@ant-design/icons-vue';
import router, { setupRouter } from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import { setupI18n } from './lang';

// 初始化 APP
export const createApp = () => {
  const app = createSSRApp(App);

  const icons: any = Icons;
  for (const name in icons) {
    app.component(name, icons[name]);
  }
  app.config.globalProperties.$antIcons = icons;

  app.use((vue) => {
    vue.config.globalProperties.$http = http;
  });

  app.use(Antd);

  setupRouter(app);
  app.use(router);

  // pinia
  const store = createPinia();
  store.use(piniaPluginPersist);
  app.use(store);

  // i18n
  const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    allowComposition: true,
    locale: 'en',
    silentTranslationWarn: true,
    // 关闭18n警告
    fallbackWarn: false,
    warnHtmlMessage: false,
    missingWarn: false,
  });
  app.use(i18n);

  // 关闭vue警告
  app.config.warnHandler = (msg, instance, trace) => {};

  return { app, router };
};
