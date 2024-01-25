<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import { RouterView } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import { provide, ref } from 'vue';
import 'dayjs/locale/zh-cn';
import { useLangStore } from '@/stores/lang';

const { isLongLanguage } = useLangStore();
const { spinning } = storeToRefs(useAppStore());
const flag = ref(new Date().getTime());
const reload = () => {
  flag.value = new Date().getTime();
};
provide('reload', reload);
</script>
<template>
  <div :class="{en:isLongLanguage(),'app-height':true}">
    <a-spin :spinning="spinning">
      <a-config-provider :locale="isLongLanguage()? enUS : zhCN" :key="flag">
        <RouterView />
      </a-config-provider>
    </a-spin>
  </div>
</template>

<style scoped></style>
