<template>
  <a-drawer width="75%" placement="left" :closable="false" :visible="visible" @close="closeDrawer">
    <div>
      <img src="@/assets/images/logo_dark.png" alt="Wondergate — Cross-Border Payment Gateway" class="drawer-logo" />
      <Menus ref="menus" mode="inline" class="is-phone-menu"></Menus>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import Menus from '@/components/header/components/menu/index.vue';
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance() as any;
const visible = ref(false);

const openDrawer = () => {
  visible.value = true;
  nextTick(() => {
    proxy.$refs.menus.expandMenu();
  });
};

const closeDrawer = () => {
  visible.value = false;
};

defineExpose({ openDrawer });
</script>

<style lang="less">
.drawer-logo {
  width: 128px;
  margin-bottom: 2.6rem;
}
</style>
