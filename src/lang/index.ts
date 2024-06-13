import { useLangStore } from '@/stores/lang';
import { storeToRefs } from 'pinia';
import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

export function setI18nLanguage(i18n: any, locale: string): void {
  loadLocaleMessages(i18n, locale).then(() => {
    if (i18n.mode === 'legacy') {
      i18n.global.locale = locale;
    } else {
      (i18n.global.locale as any).value = locale;
    }
    try {
      const { lang } = storeToRefs(useLangStore());
      lang.value = locale; // 更新localStorage里的值
      const html = document.querySelector('html');
      if (html) {
        html.setAttribute('lang', locale);
      }
    } catch (e) {}
  });
}

export function setupI18n(options: any) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

export async function loadLocaleMessages(
  i18n: any,
  locale: string
): Promise<any> {
  // load locale messages with dynamic import
  const messages = await import(`@/lang/locales/${locale}.ts`);

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}
