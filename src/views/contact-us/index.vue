<template>
  <Header :is-dark="true"></Header>
  <div class="app-header-distance"></div>
  <div class="layout-background-3">
    <FloatStructure height="65rem" :image-path="ContactImage">
      <template #content>
        <div class="app-title-text app-title-font app-color-text-main">
          {{ $t('moo.contact.toBegin') }}
        </div>
        <div class="app-description-text-small app-detail-font contact-description" v-html="$t('moo.contact.youWant')">
        </div>
        <a-tabs>
          <template :key="index" v-for="(item, index) in informationList">
            <a-tab-pane style="height: 400px">
              <template #tab>{{ item.title }}</template>
              <a-row :gutter="5">
                <a-col :span="9">
                  <div>{{ $t('moo.contact.email') }} :</div>
                </a-col>
                <a-col :span="15">
                  <div>
                    {{ 'info@wondergate.io' }}
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="5" class="layout-content-subspacing-small">
                <a-col :span="9" >
                  <div>{{ $t('moo.contact.companyName') }} :</div>
                </a-col>
                <a-col :span="15">
                  <div>
                    {{ item?.name }}
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="5" class="layout-content-subspacing-small">
                <a-col :span="9">
                  <div>{{ $t('moo.contact.officeAddress') }} :</div>
                </a-col>
                <a-col :span="15">
                  <div>
                    {{ item?.description }}
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="5" class="layout-content-subspacing-small" v-if="item.title === 'Hong Kong'">
                <a-col :span="9">
                  <div>{{ $t('moo.contact.companyRegistrationNumber') }} :</div>
                </a-col>
                <a-col :span="12">
                  <div>3311511</div>
                </a-col>
              </a-row>
              <a-row :gutter="5" class="layout-content-subspacing-small" :wrap="true">
                <a-col :span="9">
                  <div>{{ $t('moo.contact.userService') }} :</div>
                </a-col>
                <a-col :span="15">
                  <div class="linebreak" v-html="item?.userService"></div>
                </a-col>
              </a-row>
            </a-tab-pane>
          </template>
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
      'FLAT/RM 121 1/F LIVEN HOUSE NOS.61-63 KING YIP STREET KWUN TONG',
    userService:
      'Services for Hong Kong users are regulated under Hong Kong law, including but not limited to: <i>Payment Systems and Stored Value Facilities Ordinance (Cap. 584), Anti-Money Laundering and Counter-Terrorist Financing Ordinance (Cap. 615)</i>, and other applicable regulations.'
  },
  {
    title: 'Canada',
    name: 'WONDERGATE FINTECH INC.',
    description: '44322 YALE RD UNIT 3B #198 CHILLIWACK BC V2R 4H1 CANADA',
    userService:
      'Services for Canadian users comply with: <i>The Constitution of Canada, Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA), Payment Services Act</i>, and other relevant provincial and federal laws.\nUsers from other jurisdictions must ensure compliance with their local money transmission regulations before using our services.'
  },
  {
    title: 'America',
    name: 'Wondergate Limited',
    description: '1401 21ST ST STE R  SACRAMENTO, CA 95811',
    userService:
      'Services in the United States are governed by U.S. federal law, including: <i>Bank Secrecy Act (BSA), Electronic Fund Transfer Act (Regulation E)</i>, and other relevant statutes. These services are not available to users in U.S.-sanctioned jurisdictions.'
  }
]);
</script>

<style lang="less">
@import '@/styles/base';

.ant-tabs-top>.ant-tabs-nav::before,
.ant-tabs-bottom>.ant-tabs-nav::before,
.ant-tabs-top>div>.ant-tabs-nav::before,
.ant-tabs-bottom>div>.ant-tabs-nav::before {
  border: 0;
}

.contact-description {
  padding: 1.65rem 0 0.8rem;
}

.linebreak {
  white-space: pre-line;
}

.linebreak i {
  font-style: italic !important;
}
.content-font {
  font-size: 1rem;
}
</style>
