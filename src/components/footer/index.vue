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
    <Button :is-center="true" class="title-button"></Button>
  </div>
  <div class="footer-wrap footer-navigation-wrap">
    <div class="layout-content">
      <div class="footer-navigation-logo">
        <img src="@/assets/images/logo_light.png" alt="logo">
      </div>
      <div class="layout-two-side-start">
        <div class="footer-navigation-menu" v-for="item in menuList">
          <RouterLink :to="{ path: item.path, hash: item.hash??''}"
                      class="footer-navigation-menu-item app-text-font app-description-text">
            {{ $t(String(item.name)) }}
          </RouterLink>
          <template v-if="item.menus">
            <div class="footer-navigation-submenu">
              <RouterLink :to="{ path: subItem.path, hash: subItem.hash??''}" v-for="subItem in item.menus"
                          class="footer-navigation-submenu-item app-text-font
                          app-description-text-small
                           app-description-text app-detail-font"
                          @click="onLinkClick"
                          style="font-size: .9rem">
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
        {{ $t('moo.footer.privacy') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue';
import { IMenu } from '@/interface/menu';
import { useRoute, useRouter } from 'vue-router';
import { nextTick, watch } from 'vue';

const route = useRoute();
const router = useRouter();

const menuList: IMenu[] = [
  {
    name: 'moo.menu.home',
    path: '/index',
    hash: '#header',
    menus: [
      {
        name: 'moo.home.globalAcquiring',
        path: '/index',
        hash: '#globalAcquiring',
      },
      {
        name: 'moo.home.globalIssuing',
        path: '/index',
        hash: '#globalAcquiring',
      },
    ],
  },
  {
    name: 'moo.menu.productCenter',
    path: '/product-center/global-payments',
    hash: '#header',
    menus: [
      {
        name: 'moo.product.globalTitle',
        path: '/product-center/global-payments',
        hash: '#paymentRouting',
      },
      // {
      //   name: 'moo.home.globalIssuing',
      //   path: '/index',
      //   hash: '#globalAcquiring',
      // },
    ],
  },
  {
    name: 'moo.menu.securityCenter',
    path: '/security-center',
    hash: '#header',
    menus: [
      {
        name: 'moo.security.riskControl',
        path: '/security-center',
        hash: '#riskControl',
      },
      {
        name: 'moo.security.chargebackAlerts',
        path: '/security-center',
        hash: '#chargebackAlerts',
      },
      {
        name: 'moo.security.customerService',
        path: '/security-center',
        hash: '#customerService',
      },
      {
        name: 'moo.security.business',
        path: '/security-center',
        hash: '#business',
      },
    ],
  },
  {
    name: 'moo.menu.aboutUs',
    path: '/about-us',
    hash: '#header',
    menus: [
      {
        name: 'moo.about.companyProfile',
        path: '/about-us',
        hash: '#companyProfile',
      },
      {
        name: 'moo.about.provide',
        path: '/about-us',
        hash: '#provide',
      },
    ],
  },
];
// const imageList = createImageList('/footer/logo_connection_', 6);
const onLinkClick = () => {
  if (route.hash) {
    nextTick(() => {
      const id = route.hash.replaceAll('#', '');
      document.getElementById(id)?.scrollIntoView();
    });
  }
};
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    onLinkClick();
  },
  { immediate: true },
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
  background-image: url("@/assets/images/footer/bg_launch.png");
  height: 23rem;
  text-align: center;

  .footer-launch-content {
    padding: 3.6rem 0 4.3rem;

    .footer-launch-title {
      padding-bottom: 1rem;
    }
  }
}

.footer-navigation-wrap {
  position: relative;
  background: @color-black;
  height: 22.5rem;

  .footer-navigation-logo {
    padding: 2.6rem 0;
    width: 190px;
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
        margin-bottom: .65rem;
        color: @color-white;
        display: inline-block;
      }
    }
  }
}

.footer-navigation-connection-logo {
  padding: 0 .6rem;
}


.footer-privacy-wrap {
  width: 100%;
  padding-bottom: .5rem;
  font-size: .6rem;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
