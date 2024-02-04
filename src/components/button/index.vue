<template>
  <div :style="{ 'text-align':isCenter? 'center':'left',padding: '.5rem 0' }">
    <a :class="{
   'button-bg': !isDark,
   'button-dark-bg ':isDark,
   'button':true
    }" @click="onButtonClick">{{ $t(text) }}
    </a>
  </div>
  <a-modal v-model:visible="visible" :title="$t('moo.footer.companyInformation')"
           :ok-button-props="{
              class:{'button-dark-bg':true}
           }"
           :cancel-button-props="{
             style:{display:'none'}
           }"
           @ok="handleOk" :ok-text="$t('moo.footer.copyEmail')">
    <div class=" app-detail-font">
      {{ $t('moo.footer.email') }} : <br> {{ email }}
    </div>
    <a-divider/>
    <div class="app-detail-font"
         v-html="$t('moo.footer.address')">
    </div>
  </a-modal>
</template>

<script setup lang="ts">
// props
import { ref } from 'vue';
import { copyString } from '@/utils/tools';


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


const visible = ref(false);
const email = 'info@wondergate.io';

const onButtonClick = () => {
  visible.value = true;
};

const handleOk = () => {
  copyString(email);
  visible.value = false;
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
  }
}

.button-bg {
  border-color: @color-bg !important;
  background-color: @color-bg !important;
  color: @color-text-dark !important;
}

.button-dark-bg {
  border-color: @color-bg1 !important;
  background-color: @color-bg1 !important;
  color: @color-text;
}

.ant-modal-wrap {
  .ant-modal-content {
    border-radius: 25px;

    .ant-modal-header {
      border-radius: 25px 25px 0 0;
    }

    .ant-modal-footer {
      border-radius: 0 0 25px 25px;
    }

    .ant-btn {
      border-radius: 25px;
    }
  }
}
</style>
