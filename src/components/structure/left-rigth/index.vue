<template>
  <div
    :class="{
      'layout-two-side-center': alignmentMode === 'center',
      'layout-two-side-start': alignmentMode === 'top',
      'layout-two-side-end': alignmentMode === 'bottom',
    }"
  >
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  alignmentMode: {
    type: String,
    default: 'center',
  },
});
</script>

<style scoped lang="less"></style>
