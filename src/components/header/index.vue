<template>
  <div class="header-wrap layout-content">
    <div class="header-inner layout-content layout-two-side-center">
      <div id="header" class="header-logo" @click="onLogoClick">
        <img :src="isDark?'/src/assets/images/logo_dark.png':'/src/assets/images/logo_light.png'" alt="logo">
      </div>
      <div class="header-title layout-all-center">
        <RouterLink :to="item.path" v-for="item in titleList"
                    :class="{
                   'header-title-item':true,
                  'layout-all-center':true,
                  'app-text-font':true,
                  'app-color-text':!isDark,
                  'app-color-text-dark':isDark,

           }">
          {{ $t(item.name) }}
        </RouterLink>
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
defineProps({
  isDark: {
    type: Boolean,
    default: true,
  },
});

const onLogoClick = () => {
  window.location.href = '/';
};

const titleList = [
  {
    name: 'moo.menu.productCenter',
    path: '/product-center',
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
        padding: 0 1rem;
        font-size: 1rem;
        font-weight: bolder;
        text-decoration: none;
        height: 100%;
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
