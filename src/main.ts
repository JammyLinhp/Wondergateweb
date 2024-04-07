import { createApp } from 'vue';
import { createPinia, storeToRefs } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import Antd from 'ant-design-vue';
import { setupI18n } from '@/lang';
import App from './App.vue';
import router, { setupRouter } from './router';
import http from './utils/http';
import './styles/main.less';
import './style.css';
import { useLangStore } from './stores/lang';
import * as Icons from '@ant-design/icons-vue';

// 适配屏幕大小
const reSize = () => {
  let baseFontSize: number = 8;
  const designSize: number = 900;
  const width: number = +window.innerWidth;
  if (width <= 2000 && width > 1600) {
    baseFontSize = 9;
  }
  if (width <= 1600 && width > 1350) {
    baseFontSize = 10.6;
  }
  if (width <= 1350) {
    baseFontSize = 11;
  }

  let currentFontSize: number = (width / designSize) * baseFontSize;
  if (width <= 770) {
    currentFontSize = 12;
  }

  document.getElementsByTagName(
    'html'
  )[0].style.fontSize = `${currentFontSize}px`;
};
reSize();
window.onresize = () => {
  reSize();
};

const app = createApp(App);

const icons: any = Icons;
for (const name in icons) {
  app.component(name, icons[name]);
}
app.config.globalProperties.$antIcons = icons;
// pinia
const store = createPinia();
store.use(piniaPluginPersist);
app.use(store);

app.use((vue) => {
  vue.config.globalProperties.$http = http;
});
// i18n
const { lang } = storeToRefs(useLangStore());
export const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  allowComposition: true,
  locale: lang.value,
  silentTranslationWarn: true,
  // 关闭18n警告
  fallbackWarn: false,
  warnHtmlMessage: false,
  missingWarn: false,
});

setupRouter(app);

app.use(router);
app.use(Antd);
app.use(i18n);

// 关闭vue警告
app.config.warnHandler = (msg, instance, trace) => {};
app.mount('#app');
