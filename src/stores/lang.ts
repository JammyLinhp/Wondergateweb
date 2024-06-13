import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLangStore = defineStore(
  'lang',
  () => {
    const lang = ref('en');
    const supportsLang = ref(['zh-CN', 'en']);
    const isLongLanguage = () => lang.value === 'en';
    return {
      lang,
      supportsLang,
      isLongLanguage,
    };
  },
);
