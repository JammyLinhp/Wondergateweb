import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore(
  'app',
  () => {
    // 全局loading
    const spinning = ref(false);
    const user = ref();
    const loginTime = ref(new Date().getTime());
    const permissions = ref();
    const loginOut = () => {
      user.value = null;
      window.location.href = '/user/login';
    };
    return { spinning, user, loginOut, permissions, loginTime };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage,
          paths: ['user'],
        },
        {
          key: 'permissions',
          storage: localStorage,
          paths: ['permissions'],
        },
      ],
    },
  }
);
