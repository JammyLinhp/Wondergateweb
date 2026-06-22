<template>
  <div class="footer-launch-wrap footer-wrap">
    <div class="layout-content footer-launch-content">
      <div class="app-title-text app-title-font footer-launch-title">
        {{ $t('moo.footer.launch') }}
      </div>
      <div class="app-subtitle-text app-detail-font">
        {{ $t('moo.footer.unleash') }}
      </div>
    </div>
    <Button v-if="isDisplayButton" :is-center="true"></Button>
  </div>
  <div class="footer-wrap footer-navigation-wrap">
    <div class="layout-content">
      <div class="footer-navigation-logo">
        <img src="@/assets/images/logo_light.webp" alt="Wondergate — Cross-Border Payment Gateway" width="200" height="54" />
      </div>
      <div class="layout-two-side-start-always">
        <div class="footer-navigation-menu data-item" v-for="item in titleList">
          <RouterLink
            :to="{ path: item.path, hash: item.hash ?? '' }"
            @click="onLinkClick(item)"
            class="footer-navigation-menu-item app-text-font app-description-text"
          >
            {{ $t(String(item.name)) }}
          </RouterLink>
          <template v-if="item.menus">
            <div class="footer-navigation-submenu">
              <RouterLink
                :to="{ path: subItem.path, hash: subItem.hash ?? '' }"
                v-for="subItem in item.menus"
                class="footer-navigation-submenu-item app-text-font app-description-text-small app-description-text app-detail-font"
                @click="onLinkClick(subItem)"
                style="font-size: 0.9rem"
              >
                {{ $t(String(subItem.name)) }}
              </RouterLink>
            </div>
          </template>
        </div>

        <!--        <div class="layout-two-side-start">-->
        <!--          <img class="footer-navigation-connection-logo" :src="item" alt="logo"-->
        <!--               v-for="item in imageList">-->
        <!--        </div>-->
        <!--        <div class="footer-navigation-menu">-->
        <!--         -->
        <!--        </div>-->
      </div>
    </div>
    <div class="footer-privacy-wrap">
      <div class="app-detail-font layout-content">
        <a href="/policy/privacy">Privacy </a>
        - <a href="/policy/cookies">Cookies </a> -
        <a href="/security-center/terms-and-policies/agreement">Terms and conditions </a> -
        <a href="/policy/disclaimer">Disclaimer</a> {{ $t('moo.footer.privacy') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue';
import { IMenu } from '@/interface/menu';
import { useRoute, useRouter } from 'vue-router';
import { nextTick, watch } from 'vue';
import { menuList, saveHeaderKeyValue } from '@/components/header/tools';

defineProps({
  isDisplayButton: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const router = useRouter();

const titleList: IMenu[] = menuList;

// const imageList = createImageList('/footer/logo_connection_', 6);
const onLinkClick = (item?: any) => {
  if (route.hash) {
    nextTick(() => {
      const id = route.hash.replaceAll('#', '');
      document.getElementById(id)?.scrollIntoView();
    });
  }
  if (item) {
    saveHeaderKeyValue(item);
  }
};

watch(
  () => router?.currentRoute?.value,
  (newValue: any) => {
    onLinkClick();
  },
  { immediate: true }
);
</script>

<style lang="less">
@import '@/styles/base.less';

.footer-wrap {
  width: 100%;
  color: @color-white;
  background-size: cover;
}

.footer-launch-wrap {
  background-image: url('@/assets/images/footer/bg_launch.webp');
  height: 23rem;
  text-align: center;

  .footer-launch-content {
    padding: 3.6rem 0 4.3rem;

    .footer-launch-title {
      max-width: 90vw;      padding-bottom: 1rem;
    }
  }
}

.footer-navigation-wrap {
  position: relative;
  background: @color-black;

  .footer-navigation-logo {
    padding: 2.6rem 0;
    width: 180px;
  }
}

.footer-navigation-menu {
  flex: 1;

  .footer-navigation-menu-item {
    display: inline-block;
    margin-bottom: 1.3rem;
    color: @color-white;
  }

  .footer-navigation-submenu {
    display: flex;
    flex-direction: column;

    .footer-navigation-submenu-item {
      margin-bottom: 0.65rem;
      color: @color-white;
      display: inline-block;
    }
  }
}

.footer-navigation-connection-logo {
  padding: 0 0.6rem;
}

.footer-privacy-wrap {
  width: 100%;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  font-size: 0.6rem;
}
</style>
