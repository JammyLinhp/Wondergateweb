<template>
  <Title
    right="19"
    title="moo.solutions.crossBorder"
    title-main="moo.solutions.variousIndustries"
    title-description="moo.solutions.titleDescription"
    :image-path="TitleImage"
  ></Title>
  <meta name="title" content="Cross-Border Payment Solutions for Global Industries | Wondergate" />
  <meta
    name="description"
    content="Enable seamless multi-currency payments with our global payment infrastructure. From digital content revenue sharing to logistics settlement, we provide secure payment processing and fraud protection for every industry."
  />
  <meta
    name="keywords"
    content="Cross-Border Payment Solutions, Multi-Currency Payments, Global Payment Infrastructure, Secure Payment Processing, Industry-Specific Payment Solutions, payment processing security, Payment Solutions for Global Industries"
  />
  <div class="layout-background-3">
    <div class="layout-content app-color-text-main layout-horizontal-equalization">
      <ParagraphStructure :paragraph-array="industryList" :image-path="IndustryImage" title="moo.solutions.eCommerceIndustry">
      </ParagraphStructure>
    </div>
  </div>

  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <ParagraphStructure :paragraph-array="gamingList" :image-path="GamingImage" title="moo.solutions.gamingIndustry">
    </ParagraphStructure>
  </div>

  <div class="layout-background-3">
    <div class="layout-content app-color-text-main layout-horizontal-equalization">
      <ParagraphStructure :paragraph-array="logisticsList" :image-path="LogisticsImage" title="moo.solutions.logisticsIndustry">
      </ParagraphStructure>
    </div>
  </div>

  <Footer></Footer>
</template>
<script setup lang="ts">
import Title from '@/components/header/title/index.vue';
import Footer from '@/components/footer/index.vue';
import ParagraphStructure from '@/components/structure/left-rigth/half/paragraph/index.vue';
import { ref } from 'vue';
import { ICard } from '@/interface/home';
import TitleImage from '@/assets/images/solutions/img_solutions_title.png';
import IndustryImage from '@/assets/images/solutions/img_solutions_industry.png';
import GamingImage from '@/assets/images/solutions/img_solutions_gaming.png';
import LogisticsImage from '@/assets/images/solutions/img_solutions_logistics.png';

const industryList = ref<ICard[]>([
  { title: 'moo.solutions.currencyConversionTitle', description: 'moo.solutions.currencyConversionDescription' },
  { title: 'moo.solutions.transactionCostsTitle', description: 'moo.solutions.transactionCostsDescription' },
  { title: 'moo.solutions.efficiencyTitle', description: 'moo.solutions.efficiencyDescription' },
  { title: 'moo.solutions.trustTitle', description: 'moo.solutions.trustDescription' },
]);

const gamingList = ref<ICard[]>([
  { title: 'moo.solutions.purchaseTitle', description: 'moo.solutions.purchaseDescription' },
  { title: 'moo.solutions.simplifiedTitle', description: 'moo.solutions.simplifiedDescription' },
  { title: 'moo.solutions.protectionTitle', description: 'moo.solutions.protectionDescription' },
  { title: 'moo.solutions.systemTitle', description: 'moo.solutions.systemDescription' },
]);

const logisticsList = ref<ICard[]>([
  { title: 'moo.solutions.settlementTitle', description: 'moo.solutions.settlementDescription' },
  { title: 'moo.solutions.transactionsTitle', description: 'moo.solutions.transactionsDescription' },
  { title: 'moo.solutions.fundFlowTitle', description: 'moo.solutions.fundFlowDescription' },
  { title: 'moo.solutions.riskTitle', description: 'moo.solutions.riskDescription' },
]);
</script>

<style scoped lang="less">
//@import '@/styles/base';
</style>
