<template>
  <Header :is-dark="false"></Header>
  <div class="layout-background-2 app-header-distance">
    <div class="structure-title-wrap">
      <div class="layout-content layout-two-side-center">
        <div class="structure-title-left">
          <div class="structure-title-notes">
            <star-filled class="structure-title-notes-text"/>
            <span class="structure-title-notes-text app-detail-font">{{ $t('moo.home.labels') }}</span>
          </div>
          <div class="app-title-text app-title-font home-title-padding-top app-color-text">
            {{ $t('moo.home.title') }}
          </div>
          <div class="app-title-text app-title-font home-title-padding-bottom app-color-white">
            {{ $t('moo.home.titleMain') }}
          </div>
          <div class="app-description-text-small app-detail-font home-title-padding app-color-white">
            {{ $t('moo.home.titleExplanation') }}
          </div>
          <div class="title-button">
            <Button :is-dark="true"></Button>
          </div>
        </div>
        <div class="structure-title-right">
          <img src="../assets/images/home/img_title_payment_detail.png" alt="payment">
        </div>
      </div>

      <div class="data-item-wrap layout-content layout-two-side-center">
        <div v-for="item in dataList" class="app-color-text">
          <div class="app-title-font app-subtitle-text">{{ $t(String(item.title)) }}</div>
          <div class="app-description-text-small app-detail-font">
            {{
              $t(String(item.description))
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 图文说明 -->
  <div class="layout-background-3">
    <div class="layout-content app-color-text-main app-text-font">
      <div class="app-title-text  home-suite-title-padding ">
        {{ $t('moo.home.suite') }}
      </div>
      <div class="app-description-text  home-suite-tip-padding app-detail-font"
           v-html=" $t('moo.home.suiteDescription')">
      </div>

      <div id="globalAcquiring" class="home-card-wrap layout-content layout-two-side-start app-detail-font">
        <div class="home-card-content" v-for="item in cardList">
          <div><img :src="item.path" alt=""></div>
          <div class="home-card-title app-subtitle-text">{{ $t(String(item.title)) }}</div>
          <div class="app-description-text-small">{{ $t(String(item.description)) }}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- ------ -->
  <div>
    <div class="layout-content app-color-text-main layout-two-side-end">
      <div class="layout-horizontal-equalization">
        <div class="app-title-text-small home-suite-title-padding app-text-font">
          {{ $t('moo.home.convenientSystemTitle') }}
        </div>
        <div class="app-description-text-small app-detail-font"
             v-html=" $t('moo.home.convenientSystemDescription')">
        </div>
      </div>
      <div class="layout-horizontal-equalization">
        <img src="../assets/images/home/img_convenient_system.png" alt="payment">
      </div>
    </div>
    <div class="layout-all-center layout-content" v-if="organizationList.length!=0">
      <img class="home-logo-organization" :src="item" alt="logo" v-for="item in organizationList">
    </div>

    <div class="layout-content home-rapid-transaction">
      <div class="app-subtitle-text app-text-font layout-all-center">
        {{ $t('moo.home.rapidTransactionTitle') }}
      </div>
      <div class="app-description-text app-detail-font app-detail-font layout-all-center"
           v-html=" $t('moo.home.rapidTransactionDescription')">
      </div>
    </div>

    <div class="home-step-wrap layout-two-side-center app-detail-font">
      <div class="layout-all-center home-step-content" v-for="(item,index) in stepList">
        <div class="home-step-line" v-if="index!==stepList.length-1"></div>
        <div><img :src="item.path" alt=""></div>
        <div class="app-description-text home-step-text">{{ $t(String(item.title)) }}</div>
        <div class="app-description-text-small app-text-font app-color-text-main">{{
            $t(String(item.description))
          }}
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import Button from '@/components/button/index.vue';
import globalAcquiringImg from '@/assets/images/home/img_global_acquiring.png';
import revenueRecognitionImg from '@/assets/images/home/img_revenue_recognition.png';
import globalIssuingImg from '@/assets/images/home/img_global_issuing.png';
import stepOne from '@/assets/images/home/img_step_one.png';
import stepTwo from '@/assets/images/home/img_step_two.png';
import stepThree from '@/assets/images/home/img_step_three.png';
import { ref } from 'vue';
import { ICard } from '@/interface/home';
import { createImageList } from '@/utils/tools';

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
    path: stepOne,
  },
  {
    title: 'moo.home.stepTow',
    description: 'moo.home.stepTowDescription',
    path: stepTwo,
  },
  {
    title: 'moo.home.stepThree',
    description: 'moo.home.stepThreeDescription',
    path: stepThree,
  },
];

const organizationList = ref(createImageList(import.meta.globEager('../assets/images/home/organization/*')) as any);
</script>

<style lang="less" scoped>
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

    .home-card-title {
      padding: 1.1rem 0 .8rem;
    }
  }
}


.home-logo-organization {
  max-width: 9.2rem;
  max-height: 1.8rem;
  padding: 0 1.9rem;

  &:first-child {
    padding-left: 0;
  }

  &:nth-child(2) {
    max-height: 3.7rem;
  }

  &:last-child {
    padding-right: 0;
  }
}

.home-rapid-transaction {
  padding-top: 7rem;
}

.home-step-wrap {
  width: 1100px;
  margin: auto;
  padding: 3rem 0 8rem;

  .home-step-content {
    position: relative;
    flex-direction: column;
    width: 240px;
    text-align: center;

    .home-step-text {
      padding: 1.1rem 0;
      color: @color-text-2;
    }

    .home-step-line {
      position: absolute;
      width: 400px;
      height: 3px;
      background: linear-gradient(244deg, rgba(238, 238, 238, 0.00) 17%, rgba(227, 227, 227, 0.70) 49%, rgba(216, 216, 216, 0.00));
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
