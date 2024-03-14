<template>
  <HalfStructure>
    <template #left>
      <div class="layout-two-side-start">
        <div class="paragraph-left-warp">
          <check-circle-filled class="app-color-text"/>
        </div>
        <div class="paragraph-right-warp">
          11232131
        </div>
      </div>
    </template>
    <template #right>
      <div>
      </div>
    </template>
  </HalfStructure>
</template>

<script setup lang="ts">
import HalfStructure from '@/components/structure/left-rigth/half/index.vue';
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';

.paragraph-left-warp {
  width: 1.5rem;
}

.paragraph-right-warp {
  padding-left: 10px;
  flex: 1;
}

</style>
