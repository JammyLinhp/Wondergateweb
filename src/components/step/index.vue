<template>
  <div
    class="app-subtitle-text app-text-font layout-all-center"
    style="text-align: center"
    v-if="title"
  >
    {{ $t(title) }}
  </div>
  <div
    class="app-description-text app-detail-font app-detail-font layout-all-center"
    v-if="description"
    v-html="$t(description)"
  ></div>
  <div class="step-wrap layout-two-side-center app-detail-font">
    <div
      class="layout-all-center step-content"
      v-for="(item, index) in stepList"
    >
      <div class="step-line" v-if="index !== stepList.length - 1"></div>
      <div><img :src="item.path" alt="" /></div>
      <div class="app-description-text step-text">
        {{ $t(String(item.title)) }}
      </div>
      <div class="app-description-text-small app-text-font app-color-text-main">
        {{ $t(String(item.description)) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  stepList: {
    type: Array<any>,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>

<style lang="less">
@import '@/styles/base.less';

.step-wrap {
  width: 1100px;
  margin: auto;
  padding: 3rem 0 8rem;

  .step-content {
    position: relative;
    flex-direction: column;
    width: 240px;
    text-align: center;

    .step-text {
      padding: 1.1rem 0;
      color: @color-text-2;
    }

    .step-line {
      position: absolute;
      width: 400px;
      height: 3px;
      background: linear-gradient(
        244deg,
        rgba(238, 238, 238, 0) 17%,
        rgba(227, 227, 227, 0.7) 49%,
        rgba(216, 216, 216, 0)
      );
      border-radius: 1px;
      top: 42px;
      left: 160px;
    }

    img {
      max-height: 85px;
    }
  }
}
</style>
