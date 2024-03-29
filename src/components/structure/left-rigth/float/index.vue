<template>
  <div class="app-color-text-main app-clean-float">
    <img class="structure-percentage-width-50" :class="{'float-img-left':isLeft,'float-img-right':!isLeft}"
         :style="{height}" :src="imagePath" alt="security">
    <div class="layout-content" :style="{height}">
      <div class="structure-percentage-width-50 float-text-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imagePath: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '60rem',
  },
  isLeft: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';


.float-img-left {
  float: left;
  padding-right: 3rem;
}

.float-img-right {
  float: right;
  padding-left: 3rem;
}

.float-text-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


</style>
