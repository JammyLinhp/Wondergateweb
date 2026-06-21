<template>
  <Header></Header>
  <meta name="title" content="Wondergate | Global Cross-Border Payment Gateway & API Integration" />
  <meta
    name="description"
    content="The ultimate cross-border payment processing platform. Support local methods, issue virtual cards, and manage multi-currency wallets through one secure API. Enhance success rates with built-in fraud prevention."
  />
  <meta
    name="keywords"
    content="Payment Gateway, Global Payment Solutions, Cross-border Payment Processing, Fraud Prevention, Payment API Integration"
  />
  <div class="layout-background-2 app-header-distance">
    <div class="structure-title-wrap">
      <div class="layout-content layout-two-side-center">
        <div class="structure-title-left">
          <div class="structure-title-notes">
            <star-filled class="structure-title-notes-text" />
            <span class="structure-title-notes-text app-detail-font">{{ $t('moo.home.labels') }}</span>
          </div>
          <h1 class="app-title-text app-title-font app-color-text">
            <div class="home-title-padding-top">{{ $t('moo.home.title') }}</div>
            <div class="home-title-padding-bottom app-color-white">{{ $t('moo.home.titleMain') }}</div>
          </h1>
          <p class="app-description-text-small app-detail-font home-title-padding app-color-white">
            {{ $t('moo.home.titleExplanation') }}
          </p>
          <div class="title-button">
            <Button :is-dark="true"></Button>
          </div>
        </div>
        <div class="structure-title-right">
          <img src="../assets/images/home/img_title_payment_detail.webp" alt="Wondergate global payment gateway infrastructure overview" loading="eager" fetchpriority="high" width="2036" height="1100" />
        </div>
      </div>

      <div class="data-item-wrap layout-content layout-two-side-center-always">
        <div v-for="item in dataList" class="app-color-text data-item">
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
  <!-- 图文说明 -->
  <div class="layout-background-3">
    <div class="layout-content app-color-text-main app-text-font">
      <h2 class="app-title-text home-suite-title-padding">
        {{ $t('moo.home.suite') }}
      </h2>
      <div class="app-description-text home-suite-tip-padding app-detail-font" v-html="$t('moo.home.suiteDescription')"></div>

      <div class="home-card-wrap layout-content layout-two-side-start app-detail-font">
        <div class="home-card-content" v-for="item in cardList">
          <div><img :src="item.path" :alt="$t(String(item.title))" /></div>
          <h3 class="home-card-title app-subtitle-text">
            {{ $t(String(item.title)) }}
          </h3>
          <p class="app-description-text-small">
            {{ $t(String(item.description)) }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- ------ -->
  <div>
    <div class="layout-content app-color-text-main layout-two-side-end">
      <div class="layout-horizontal-equalization">
        <h2 class="app-title-text-small home-suite-title-padding app-text-font">
          {{ $t('moo.home.convenientSystemTitle') }}
        </h2>
        <div class="app-description-text-small app-detail-font" v-html="$t('moo.home.convenientSystemDescription')"></div>
      </div>
      <div class="layout-horizontal-equalization">
        <img src="../assets/images/home/img_convenient_system.webp" alt="Wondergate integrated cross-border payment management system" width="1200" height="800" style="max-width:100%;height:auto" />
      </div>
    </div>
    <div class="layout-all-center layout-content home-logo-organization-wrap">
      <img class="home-logo-organization" :src="item" alt="Wondergate certified partner payment network" v-for="item in organizationList" />
    </div>
    <div class="layout-content home-rapid-transaction">
      <StepComponents
        :step-list="stepList"
        title="moo.home.rapidTransactionTitle"
        description="moo.home.rapidTransactionDescription"
      ></StepComponents>
    </div>
  </div>

  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import Button from '@/components/button/index.vue';
import StepComponents from '@/components/step/index.vue';
import globalAcquiringImg from '@/assets/images/home/img_global_acquiring.webp';
import revenueRecognitionImg from '@/assets/images/home/img_revenue_recognition.webp';
import globalIssuingImg from '@/assets/images/home/img_global_issuing.webp';
import stepOne from '@/assets/images/home/img_step_one.png';
import stepTwo from '@/assets/images/home/img_step_two.png';
import stepThree from '@/assets/images/home/img_step_three.png';
import { ref } from 'vue';
import { ICard } from '@/interface/home';

const dataList: ICard[] = [
  {
    title: 'moo.home.globalPaymentData',
    description: 'moo.home.globalPaymentTip',
  },
  {
    title: 'moo.home.customersData',
    description: 'moo.home.customersTip',
  },
  {
    title: 'moo.home.countriesData',
    description: 'moo.home.countriesTip',
  },
  {
    title: 'moo.home.cooperatingData',
    description: 'moo.home.cooperatingTip',
  },
];
const cardList: ICard[] = [
  {
    title: 'moo.home.globalAcquiring',
    description: 'moo.home.globalAcquiringDescription',
    path: globalAcquiringImg,
  },
  {
    title: 'moo.home.revenueRecognition',
    description: 'moo.home.revenueRecognitionDescription',
    path: revenueRecognitionImg,
  },
  {
    title: 'moo.home.globalIssuing',
    description: 'moo.home.globalIssuingDescription',
    path: globalIssuingImg,
  },
];

const stepList: ICard[] = [
  {
    title: 'moo.home.stepOne',
    description: 'moo.home.stepOneDescription',
    path: stepOne, width: 136, height: 160,
  },
  {
    title: 'moo.home.stepTow',
    description: 'moo.home.stepTowDescription',
    path: stepTwo, width: 136, height: 160,
  },
  {
    title: 'moo.home.stepThree',
    description: 'moo.home.stepThreeDescription',
    path: stepThree, width: 136, height: 160,
  },
];

import logo0 from '@/assets/images/home/organization/logo_organization_0.png';
import logo1 from '@/assets/images/home/organization/logo_organization_1.png';
import logo2 from '@/assets/images/home/organization/logo_organization_2.png';
import logo3 from '@/assets/images/home/organization/logo_organization_3.png';
import logo4 from '@/assets/images/home/organization/logo_organization_4.png';
import logo5 from '@/assets/images/home/organization/logo_organization_5.png';
import logo6 from '@/assets/images/home/organization/logo_organization_6.png';

const organizationList = ref([logo0, logo1, logo2, logo3, logo4, logo5, logo6]);
</script>

<style lang="less">
@import '@/styles/base';
@import '@/styles/structure';

.home-suite-title-padding {
  padding: 4.3rem 0 1rem;
}

.home-suite-tip-padding {
  padding-bottom: 4.5rem;
}

.home-card-wrap {
  padding-bottom: 3.5rem;

  .home-card-content {
    width: 14.7rem;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    .home-card-title {
      padding: 1.1rem 0 0.8rem;
    }
  }
}

.home-logo-organization {
  max-width: 180px;
  max-height: 120px;
  width: auto;
  height: auto;
  aspect-ratio: attr(width) / attr(height);
  padding: 0 1.9rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}

.home-rapid-transaction {
  padding-top: 7rem;
}
</style>
