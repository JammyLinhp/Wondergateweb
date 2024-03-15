<template>
  <div class="header-wrap layout-content">
    <div class="header-inner layout-content layout-two-side-center">
      <div id="header" class="header-logo" @click="onLogoClick">
        <img v-if="isDark" src="../../assets/images/logo_dark.png" alt="logo">
        <img v-if="!isDark" src="../../assets/images/logo_light.png" alt="logo">
      </div>
      <div class="header-title layout-all-center">

        <a-menu mode="horizontal" theme="dark" triggerSubMenuAction="click">
          <template v-for="(item,index) in titleList">
            <template v-if="!item.menus">
              <a-menu-item :key="index">
                <RouterLink :to="item.path"
                            class="header-title-item"
                            :class="{'app-color-text':!isDark,'app-color-text-dark':isDark,}">
                  {{ $t(item.name) }}
                </RouterLink>
              </a-menu-item>
            </template>
            <template v-else>
              <a-sub-menu :key="item.name">
                <template #title>
                  <div class="header-title-item  "
                       :class="{'app-color-text':!isDark,'app-color-text-dark':isDark,}">
                    {{ $t(item.name) }}
                  </div>
                </template>
                <a-menu-item v-for="subItem in item.menus" :key="subItem.path">
                  <RouterLink :to="subItem.path"
                              class="header-title-item"
                              :class="{'app-color-text':!isDark,'app-color-text-dark':isDark,}">
                    {{ $t(subItem.name) }}
                  </RouterLink>
                </a-menu-item>
              </a-sub-menu>
            </template>
          </template>
        </a-menu>
        <!--        </RouterLink>-->
        <!--        <div :class="{-->
        <!--                  'layout-background-1': !isDark,-->
        <!--                  'layout-background-2': isDark,-->
        <!--                  'app-color-text':isDark,-->
        <!--                  'app-color-text-dark': !isDark,-->
        <!--                  'header-title-language':true-->
        <!--           }">-->
        <!--          {{ $t('language') }}-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// props
import { IMenu } from '@/interface/menu';

defineProps({
  isDark: {
    type: Boolean,
    default: true,
  },
});

const onLogoClick = () => {
  window.location.href = '/';
};

const titleList: IMenu[] = [
  {
    name: 'moo.menu.productCenter',
    path: '/product-center/global-payments',
    menus: [
      {
        name: 'moo.menu.globalPayments',
        path: '/product-center/global-payments',
      },
      {
        name: 'moo.menu.collectionAccount',
        path: '/product-center/global-collection-account',
      },
    ],
  },
  {
    name: 'moo.menu.securityCenter',
    path: '/security-center',
  },
  {
    name: 'moo.menu.aboutUs',
    path: '/about-us',
  },
];
</script>

<style scoped lang="less">
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
      width: 160px;
      height: @header-height;
      line-height: @header-height;
      cursor: pointer;

      img {
        height: 2rem;
      }
    }

    .header-title {
      height: 100%;

      .header-title-item {
        font-size: 1rem;
        font-weight: bolder;
        line-height: @header-height;
      }

      .header-title-language {
        padding: .2rem 1rem;
        margin-left: 15px;
        line-height: 30px;
        text-align: center;
        font-size: .75rem;
        border-radius: 2rem;
        cursor: pointer;
      }
    }
  }
}
</style>
