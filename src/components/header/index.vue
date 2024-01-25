<template>
  <div class="header-wrap">
    <div class="header-inner">
      <div class="header-logo"></div>
      <div class="header-title">
        <RouterLink :to="item.path" v-for="item in titleList" class="header-title-item">
          {{ $t(item.name) }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const titleList = [
  {
    name: 'moozumi.home.productCenter',
    path: '',
  },
  {
    name: 'moozumi.home.securityCenter',
    path: '',
  },
  {
    name: 'moozumi.home.aboutUs',
    path: '',
  },
];
</script>

<style scoped lang="less">
@import '@/styles/base.less';

.header-wrap {
  height: 35px;

  .header-inner {
    width: 100%;
    height: 35px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-logo {
      width: 200px;
      height: 100%;
      background: #6b7fb8;
    }

    .header-title {
      width: 320px;
      height: 100%;

      .header-title-item {
        display: inline-block;
        width: 60px;
        padding: 0 10px;
        font-size: 8px;
        font-family: Avenir, Avenir-Heavy;
        font-weight: bold;
        text-align: center;
        color: @color-menu-default;
        text-decoration: auto;
        height: 35px;
        line-height: 35px;
      }
    }
  }
}
</style>
