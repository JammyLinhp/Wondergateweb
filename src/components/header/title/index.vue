<template>
  <Header :is-dark="false"></Header>
  <div class="layout-background-2 app-header-distance">
    <div class="structure-title-wrap">
      <div class="layout-content layout-two-side-center">
        <div class="structure-title-left">
          <div class="structure-title-notes" v-if="notes">
            <star-filled class="structure-title-notes-text"/>
            <span class="structure-title-notes-text app-detail-font">{{ $t(notes) }}</span>
          </div>
          <div class="app-title-text app-title-font home-title-padding-top app-color-text">
            {{ $t(title) }}
          </div>
          <div class="app-title-text app-title-font home-title-padding-bottom app-color-white">
            {{ $t(titleMain) }}
          </div>
          <div class="app-description-text-small app-detail-font home-title-padding app-color-white">
            {{ $t(titleDescription) }}
          </div>
          <div class="title-button">
            <Button :is-dark="true"></Button>
          </div>
        </div>
        <div class="structure-title-right" :style="{right}" v-if="imagePath">
          <img :src="imagePath" alt="payment">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue';
import Header from '@/components/header/index.vue';

defineProps({
  imagePath: {
    type: String,
    default: '',
  },
  right: {
    type: String,
    default: '11rem',
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
</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';
</style>
