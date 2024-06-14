<template>
  <Header :is-dark="true"></Header>
  <div class="app-header-distance"></div>
  <div class="layout-background-3">
    <FloatStructure height="38rem" :image-path="ContactImage">
      <template #content>
        <div class="app-title-text app-title-font app-color-text-main">
          {{ $t('moo.contact.toBegin') }}
        </div>
        <div
          class="app-description-text-small app-detail-font contact-description"
          v-html="$t('moo.contact.youWant')"
        ></div>
        <a-tabs
          class="layout-content-subspacing-small app-color-text-main app-description-text-small app-detail-font app-text-description-title"
        >
          <a-tab-pane :key="index" v-for="(item, index) in informationList">
            <template #tab>{{ item.title }}</template>
            <a-row :gutter="36">
              <a-col :span="9">
                <div>{{ $t('moo.contact.email') }} :</div>
              </a-col>
              <a-col :span="15">
                <div>
                  {{ 'info@wondergate.io' }}
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="36" class="layout-content-subspacing-small">
              <a-col :span="9">
                <div>{{ $t('moo.contact.companyName') }} :</div>
              </a-col>
              <a-col :span="15">
                <div>
                  {{ item?.name }}
                </div>
              </a-col>
            </a-row>
            <a-row :gutter="36" class="layout-content-subspacing-small">
              <a-col :span="9">
                <div>{{ $t('moo.contact.officeAddress') }} :</div>
              </a-col>
              <a-col :span="15">
                <div>
                  {{ item?.description }}
                </div>
              </a-col>
            </a-row>
            <a-row
              :gutter="36"
              class="layout-content-subspacing-small"
              v-if="item.title === 'Hong Kong'"
            >
              <a-col :span="9">
                <div>{{ $t('moo.contact.companyRegistrationNumber') }} :</div>
              </a-col>
              <a-col :span="12">
                <div>3311511</div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </template>
    </FloatStructure>
  </div>
  <Footer :is-display-button="false"></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import FloatStructure from '@/components/structure/left-rigth/float/index.vue';
import ContactImage from '@/assets/images/contact-us/img_contact_title.png';
import { ref } from 'vue';
import { ICard } from '@/interface/home';

const informationList = ref<ICard[]>([
  {
    title: 'Hong Kong',
    name: 'Wondergate Co., Limited',
    description:
      'FLAT/RM 121 1/F LIVEN HOUSE NOS.61-63 KING YIP STREET KWUN TONG'
  },
  {
    title: 'Canada',
    name: 'WONDERGATE FINTECH INC.',
    description: '44322 YALE RD UNIT 3B #198 CHILLIWACK BC V2R 4H1 CANADA'
  },
  {
    title: 'America',
    name: 'Wondergate Limited',
    description: '1401 21ST ST STE R  SACRAMENTO, CA 95811'
  }
]);
</script>

<style lang="less">
@import '@/styles/base';

.ant-tabs-top > .ant-tabs-nav::before,
.ant-tabs-bottom > .ant-tabs-nav::before,
.ant-tabs-top > div > .ant-tabs-nav::before,
.ant-tabs-bottom > div > .ant-tabs-nav::before {
  border: 0px;
}

.contact-description {
  padding: 1.65rem 0 0.8rem;
}
</style>
