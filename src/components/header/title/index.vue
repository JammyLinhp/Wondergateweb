<template>
  <Header></Header>
  <div class="layout-background-2 app-header-distance">
    <div class="structure-title-wrap">
      <div class="layout-content layout-two-side-center">
        <div class="structure-title-left">
          <div class="structure-title-notes" v-if="notes">
            <star-filled class="structure-title-notes-text" />
            <span class="structure-title-notes-text app-detail-font">{{ $t(notes) }}</span>
          </div>
          <h1 class="app-title-text app-title-font app-color-text">
            <div class="home-title-padding-top">{{ $t(title) }}</div>
            <div class="home-title-padding-bottom app-color-white">{{ $t(titleMain) }}</div>
          </h1>
          <div class="app-description-text-small app-detail-font home-title-padding app-color-white">
            {{ $t(titleDescription) }}
          </div>
          <div class="title-button">
            <Button :is-dark="true"></Button>
          </div>
        </div>
        <div class="structure-title-right" :class="assemblingClass()" v-if="imagePath">
          <img :src="imagePath" alt="Wondergate cross-border payment solutions banner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue';
import Header from '@/components/header/index.vue';
import { getCurrentInstance } from 'vue';

defineProps({
  imagePath: {
    type: String,
    default: '',
  },
  right: {
    type: String,
    default: '10',
  },
  notes: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  titleMain: {
    type: String,
    default: '',
  },
  titleDescription: {
    type: String,
    default: '',
  },
});
const { proxy } = getCurrentInstance() as any;

const assemblingClass = () => {
  return [`structure-img-right-distance-${+proxy.right}`];
};
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';

.structure-img-right-distance-10 {
  right: 10rem;
}
.structure-img-right-distance-19 {
  right: 10rem;
}
</style>
