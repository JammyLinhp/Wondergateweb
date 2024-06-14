<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const visible = ref(false);
const cookiesKey = 'moo_cookies_key';

const onOk = () => {
  localStorage.setItem(cookiesKey, String(new Date().getTime()));
  onClose();
};

const showDrawer = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

onMounted(() => {
  const time: any = localStorage.getItem(cookiesKey);
  if (!time || (new Date().getTime() - time) / 1000 / 60 / 60 / 24 > 1) {
    showDrawer();
  }
});
</script>

<template>
  <RouterView />
  <div class="cookies-modal" v-if="visible">
    <a-drawer
      placement="bottom"
      :closable="false"
      :visible="visible"
      :mask="false"
      :get-container="false"
      :style="{ position: 'absolute', width: '100%' }"
      @close="onClose"
    >
      <div class="app-subtitle-text">
        {{ $t('moo.footer.cookiesTitle') }}
      </div>
      <div class="app-description-text-small">
        {{ $t('moo.footer.cookiesContent') }}
      </div>
      <a-button type="primary" class="cookies-modal-button" @click="onOk">
        {{ $t('moo.footer.acceptCookies') }}
      </a-button
      >
      <a-button class="cookies-modal-button" @click="onClose">
        {{ $t('moo.footer.reject') }}
      </a-button
      >
    </a-drawer>
  </div>
</template>
<style lang="less">
.cookies-modal {
  width: 30rem;
  height: 11rem;
  overflow: hidden;
  position: fixed;
  padding: 48px;
  text-align: center;
  right: 20px;
  bottom: 0;
  box-shadow: -10px -10px 20px 10px rgba(0, 0, 0, 0.5);
  transition: all 2.6s;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  .ant-drawer {
    height: 100% !important;
  }

  .cookies-modal-button {
    margin-top: 25px;
    border-radius: 15px;

    &:last-child {
      margin-left: 20px;
    }
  }

  .ant-drawer-content,
  .ant-drawer-wrapper-body {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .ant-drawer-wrapper-body {
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.25);
  }
}
</style>
