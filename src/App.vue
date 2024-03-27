<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import { RouterView } from 'vue-router';
import { provide, ref } from 'vue';
import 'dayjs/locale/zh-cn';
import { useLangStore } from '@/stores/lang';

const { isLongLanguage } = useLangStore();
const flag = ref(new Date().getTime());
const reload = () => {
  flag.value = new Date().getTime();
};
provide('reload', reload);
</script>
<template>
  <div :class="{ en: isLongLanguage() }">
    <a-config-provider :locale="isLongLanguage() ? enUS : zhCN" :key="flag">
      <RouterView />
    </a-config-provider>
  </div>
</template>

<style>
.app-title-font {
  font-family: titleFont, serif;
}

.app-text-font {
  font-family: detailFont, serif;
}

.app-detail-font {
  font-family: textFont, serif;
}
</style>
