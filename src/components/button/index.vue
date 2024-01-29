<template>
  <div>
    <a :class="{
   'button-bg': !isDark,
   'button-dark-bg ':isDark,
   'button':true
    }">{{ $t(text) }}
    </a>
  </div>
</template>

<script setup lang="ts">
// props
defineProps({
  text: {
    type: String,
    default: 'moo.home.contactUs',
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});


</script>

<style lang="less">
@import '@/styles/base.less';

#app {
  .button {
    border-radius: 2rem;
    padding: .6rem 1.4rem;
    cursor: pointer;
    font-size: 1rem;
  }

  .button-bg {
    border-color: @color-bg;
    background-color: @color-bg;
    color: @color-bg1;
  }

  .button-dark-bg {
    border-color: @color-bg1;
    background-color: @color-bg1;
    color: @color-bg;
  }
}
</style>
