<template>
  <LeftRightStructure>
    <template #left>
      <div class="structure-percentage-width-50">
        <slot name="left"></slot>
      </div>
    </template>
    <template #right>
      <div class="structure-percentage-width-50">
        <slot name="right"></slot>
      </div>
    </template>
  </LeftRightStructure>
</template>

<script setup lang="ts">
import LeftRightStructure from '@/components/structure/left-rigth/index.vue';
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';

</style>
