<template>
  <div class="header-wrap layout-content">
    <div class="header-inner layout-content layout-two-side">
      <div class="header-logo">
        <img src="@/assets/images/logo_dark.png">
      </div>
      <div class="header-title layout-all-center">
        <RouterLink :to="item.path" v-for="item in titleList" class="header-title-item layout-all-center">
          {{ $t(item.name) }}
        </RouterLink>
        <div class="header-title-language">
          {{ $t('language') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const titleList = [
  {
    name: 'moo.menu.productCenter',
    path: '',
  },
  {
    name: 'moo.menu.securityCenter',
    path: '',
  },
  {
    name: 'moo.menu.aboutUs',
    path: '',
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
      width: 200px;
      height: @header-height;
      line-height: @header-height;

      img {
        height: 2rem;
      }
    }

    .header-title {
      height: 100%;

      .header-title-item {
        padding: 0 1rem;
        font-size: 1rem;
        font-family: Avenir, Avenir-Heavy, serif;
        font-weight: bold;
        color: @color-menu-default;
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
        background: @color-primary;
        border-radius: 2rem;
        color: @color-bg;
        cursor: pointer;
      }
    }
  }
}
</style>
