<template>
  <Title
    notes="moo.menu.collectionAccount"
    title="moo.account.unlockYourGlobal"
    title-main="moo.account.wealthChannel"
    title-description="moo.account.titleDescription"
    :image-path="TitleImage"
  ></Title>
  <meta name="title" content="Cross-Border Payment Collection & Multi-Currency Account Solutions" />
  <meta
    name="description"
    content="Streamline your international revenues with Wondergate’s Global Collection Account. Experience secure payments, competitive FX rates, and faster settlement. Centralize your global payment aggregation in one integrated platform."
  />
  <meta
    name="keywords"
    content="Global Collection Account, Cross-Border Payment Collection, Multi-Currency, Payment Aggregation, Secure Payments"
  />
  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <ParagraphStructure
      :paragraph-array="wealthPartnerList"
      :image-path="WealthPartnerImage"
      description="moo.account.wealthPartnerDescription"
      title="moo.account.wealthPartnerTitle"
    >
    </ParagraphStructure>
  </div>

  <div class="layout-background-3">
    <div class="layout-content app-color-text-main layout-horizontal-equalization">
      <ParagraphStructure
        :paragraph-array="whyChooseList"
        :image-path="WhyChooseImage"
        description="moo.account.whyChooseDescription"
        title="moo.account.whyChooseTitle"
      >
      </ParagraphStructure>

      <div class="layout-content layout-two-side-start-always layout-content-subspacing">
        <div v-for="item in localList" class="data-item">
          <div class="app-title-font app-subtitle-text">
            {{ $t(String(item.title)) }}
          </div>
          <div class="app-description-text-small app-detail-font">
            {{ $t(String(item.description)) }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <StepComponents :step-list="stepList" title="moo.account.embarkTitle"> </StepComponents>
  </div>

  <Footer></Footer>
</template>
<script setup lang="ts">
import Title from '@/components/header/title/index.vue';
import Footer from '@/components/footer/index.vue';
import ParagraphStructure from '@/components/structure/left-rigth/half/paragraph/index.vue';
import { ref } from 'vue';
import { ICard } from '@/interface/home';
import TitleImage from '@/assets/images/account/img_account_title.png';
import WealthPartnerImage from '@/assets/images/account/img_account_wealth_partner.png';
import WhyChooseImage from '@/assets/images/account/img_account_why_choose.png';
import StepOneImage from '@/assets/images/account/img_account_step_one.png';
import StepTwoImage from '@/assets/images/account/img_account_step_two.png';
import StepThreeImage from '@/assets/images/account/img_account_step_three.png';
import StepComponents from '@/components/step/index.vue';

const wealthPartnerList = ref<ICard[]>([
  {
    title: 'moo.account.globalAccessTitle',
    description: 'moo.account.globalAccessDescription',
  },
  {
    title: 'moo.account.seamlessConversionTitle',
    description: 'moo.account.seamlessConversionDescription',
  },
  {
    title: 'moo.account.safeguardedSecurityTitle',
    description: 'moo.account.safeguardedSecurityDescription',
  },
]);

const whyChooseList = ref<ICard[]>([
  {
    title: 'moo.account.oneStopTitle',
    description: 'moo.account.oneStopDescription',
  },
  {
    title: 'moo.account.costEffectiveTitle',
    description: 'moo.account.costEffectiveDescription',
  },
  {
    title: 'moo.account.dedicatedTeamTitle',
    description: 'moo.account.dedicatedTeamDescription',
  },
]);

const localList = ref<ICard[]>([
  {
    title: 'moo.account.localTitle',
    description: 'moo.account.localDescription',
  },
  {
    title: 'moo.account.acquiringTitle',
    description: 'moo.account.acquiringDescription',
  },
  {
    title: 'moo.account.paymentTitle',
    description: 'moo.account.paymentDescription',
  },
  {
    title: 'moo.account.internationalTitle',
    description: 'moo.account.internationalDescription',
  },
]);

const stepList = ref<ICard[]>([
  {
    title: 'moo.home.stepOne',
    description: 'moo.account.collectionOne',
    path: StepOneImage,
  },
  {
    title: 'moo.home.stepTow',
    description: 'moo.account.collectionTwo',
    path: StepTwoImage,
  },
  {
    title: 'moo.home.stepThree',
    description: 'moo.account.collectionThree',
    path: StepThreeImage,
  },
]);
</script>

<style scoped lang="less">
@import '@/styles/base';
</style>
