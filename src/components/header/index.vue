<template>
  <div id="header" class="header-wrap layout-content">
    <div class="header-inner layout-content layout-two-side-center-always">
      <div class="header-logo" @click="onLogoClick">
        <img v-if="isDark" src="../../assets/images/logo_dark.png" alt="logo" />
        <img v-if="!isDark" src="../../assets/images/logo_light.png" alt="logo" />
      </div>
      <div class="header-title" :class="{ 'dark-logo': isDark }">
        <Menus ref="menus" class="is-pc-menu"></Menus>
        <div class="is-phone-menu">
          <menu-outlined class="header-phone-menu-icon" @click="onDrawerClick" />
          <MenuDrawer ref="menuDrawer"></MenuDrawer>
        </div>

        <div
          :class="{
            'layout-background-1': !isDark,
            'layout-background-2': isDark,
            'app-color-text': isDark,
            'app-color-text-dark': !isDark,
            'header-title-button': true,
          }"
          @click="onUserClick(1)"
        >
          {{ $t('moo.header.register') }}
        </div>

        <div
          :class="{
            'layout-background-1': !isDark,
            'layout-background-2': isDark,
            'app-color-text': isDark,
            'app-color-text-dark': !isDark,
            'header-title-button': true,
          }"
          @click="onUserClick(2)"
        >
          {{ $t('moo.header.login') }}
        </div>
        <!--        <div :class="{-->
        <!--                          'layout-background-1': !isDark,-->
        <!--                          'layout-background-2': isDark,-->
        <!--                          'app-color-text':isDark,-->
        <!--                          'app-color-text-dark': !isDark,-->
        <!--                          'header-title-button':true-->
        <!--                   }">-->
        <!--          {{ $t('language') }}-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuDrawer from '@/components/header/components/drawer/index.vue';
import Menus from '@/components/header/components/menu/index.vue';
import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  isDark: {
    type: Boolean,
    default: false,
  },
});
const { proxy } = getCurrentInstance() as any;
const router = useRouter();

const onDrawerClick = () => {
  proxy.$refs.menuDrawer.openDrawer();
};

const onLogoClick = () => {
  proxy.$refs.menus.jumpToPage({
    path: '/index',
    name: 'home',
  });
};

const onUserClick = (code: any) => {
  switch (code) {
    case 1:
      window.open('https://portal.wondergate.io/user/register', '_blank');
      break;

    case 2:
      window.open('https://portal.wondergate.io/user/login', '_blank');
      break;

    default:
      break;
  }
};
</script>

<style lang="less">
@import '@/styles/base.less';

.header-wrap {
  position: relative;

  .header-inner {
    width: 100%;
    height: @header-height;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;

    .header-logo {
      height: @header-height;
      line-height: @header-height;
      cursor: pointer;
      min-width: 139px;

      img {
        width: 150px;
        max-height: 70%;
      }
    }

    .header-title {
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: center;

      .header-title-button {
        padding: 0.2rem 1rem;
        margin-left: 15px;
        line-height: 30px;
        text-align: center;
        font-size: 0.75rem;
        border-radius: 2rem;
        cursor: pointer;
      }
    }
  }
}

.is-phone-menu {
  display: none;

  .header-phone-menu-icon {
    font-size: 30px;
    color: @color-text;
  }
}
</style>
