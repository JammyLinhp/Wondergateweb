<template>
  <div class="app-subtitle-text app-text-font paragraph-title" v-if="title">
    {{ $t(title) }}
  </div>
  <HalfStructure :horizontal-padding="horizontalPadding">
    <template #left>
      <div class="layout-two-side-start paragraph-spacing" v-for="item in paragraphArray">
        <div class="paragraph-icon-warp">
          <div class="app-text-description-title">
            <check-circle-filled class="app-color-text"/>
          </div>
        </div>
        <div class="paragraph-text-warp">
          <div class="app-color-text-main app-description-text-small app-detail-font app-text-description-title">
            {{ $t(item.title) }}
          </div>
          <div
            class="app-color-text-main app-detail-font app-text-description-spacing-top app-description-text-smaller">
            {{ $t(item.description) }}
          </div>
        </div>
      </div>
    </template>
    <template #right>
      <div>
        <img :src="imagePath" alt="WONDERGATE">
      </div>
    </template>
  </HalfStructure>
</template>

<script setup lang="ts">
import HalfStructure from '@/components/structure/left-rigth/half/index.vue';

defineProps({
  paragraphArray: {
    type: Array<any>,
    default: () => [],
  },
  imagePath: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  horizontalPadding: {
    type: String,
    default: '3rem',
  },
});
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';

.paragraph-spacing {
  margin-top: 2rem;

  &:first-child {
    margin: 0;
  }
}

.paragraph-title {
  padding-bottom: 2.2rem;
}

.paragraph-icon-warp {
  width: 1.5rem;
}

.paragraph-text-warp {
  padding-left: 10px;
  flex: 1;
}


</style>
