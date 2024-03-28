<template>
  <LeftRightStructure :alignment-mode="alignmentMode">
    <template #left>
      <div class="structure-percentage-width-50" :class="leftClass">
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

defineProps({
  leftClass: {
    type: Object,
    default: () => ({
      'left-padding-right': true,
    }),
  },
  alignmentMode: {
    type: String,
    default: 'center',
  },
});
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';

.left-padding-right {
  padding-right: 2rem;
}
</style>
