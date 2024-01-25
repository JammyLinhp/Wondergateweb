<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="moo-content">
    <RouterView/>
  </div>
</template>
<style lang="less">
@import '@/styles/base.less';

#app {
  width: 100%;
  height: 100%;

  .moo-content {
    position: relative;
    width: 900px;
    margin: 0 auto;
  }
}

@media screen and (max-width: 900px) {
  #app {
  }
}

</style>
