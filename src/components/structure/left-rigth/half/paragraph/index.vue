<template>
  <div class="paragraph-title">
    <h2 class="app-subtitle-text app-text-font" v-if="title">
      {{ $t(title) }}
    </h2>
    <div class="app-description-text-small app-detail-font" v-if="description">
      {{ $t(description) }}
    </div>
  </div>
  <HalfStructure :left-class="leftClass">
    <template #left>
      <div
        class="layout-two-side-start-always paragraph-spacing"
        v-for="item in paragraphArray"
      >
        <div class="paragraph-icon-warp">
          <div class="app-text-description-title">
            <check-circle-filled class="app-color-text" />
          </div>
        </div>
        <div class="paragraph-text-warp">
          <h3
            class="app-color-text-main app-description-text-small app-detail-font app-text-description-title"
          >
            {{ $t(String(item.title)) }}
          </h3>
          <div
            class="app-color-text-main app-detail-font app-text-description-spacing-top app-description-text-smaller"
          >
            {{ $t(String(item.description)) }}
          </div>
        </div>
      </div>
    </template>
    <template #right>
      <img :src="imagePath" :alt="alt" class="paragraph-spacing" />
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
  alt: {
    type: String,
    default: 'Wondergate cross-border payment solution feature',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  leftClass: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';

.paragraph-spacing {
  margin-top: 2rem;
}

.paragraph-title {
  padding-bottom: 0.5rem;
}

.paragraph-icon-warp {
  width: 1rem;
}

.paragraph-text-warp {
  padding-left: 10px;
  flex: 1;
}
</style>
