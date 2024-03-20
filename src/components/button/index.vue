<template>
  <div :style="{ 'text-align':isCenter? 'center':'left',padding: '.5rem 0' }">
    <a :class="{
   'button-bg': !isDark,
   'button-dark-bg ':isDark,
   'button':true
    }" @click="onButtonClick">{{ $t(text) }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps({
  text: {
    type: String,
    default: 'moo.home.contactUs',
  },
  isDark: {
    type: Boolean,
    default: false,
  },
  isCenter: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const onButtonClick = () => {
  router.push({ path: '/contact-us' });
};

</script>

<style lang="less">
@import '@/styles/base.less';

#app {
  .button {
    border-radius: 1.5rem;
    padding: .5rem 1.4rem;
    cursor: pointer;
    font-size: 1rem;
    color: @color-text-dark;

    &:hover {
      color: @color-text-dark;
    }
  }
}

.button-bg {
  border-color: @color-bg !important;
  background-color: @color-bg !important;
}

.button-dark-bg {
  border-color: #F77222 !important;
  background-color: #F77222 !important;
}

</style>
