<template>
  <Title
    notes="moo.menu.globalPayments"
    title="moo.product.title"
    title-main="moo.product.titleMain"
    title-description="moo.product.titleDescription"
    :image-path="TitleImage"
  ></Title>
  <meta name="title" content="Global Payment Solution & Cross-Border Acquiring | Wondergate" />
  <meta name="description" content="Empower your business with a secure payment infrastructure. Our global payment solution supports multi-currency settlement, PCI-compliant connectivity, and advanced fraud prevention across 200+ regions." />
  <meta name="keywords" content="Global Payment Solution, Cross-Border Payments, Global Acquiring, Multi-Currency Settlement, Secure Payment Infrastructure" />
  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <ParagraphStructure :paragraph-array="crossBorderList" :image-path="CrossBorderImage" title="moo.product.crossBorder">
    </ParagraphStructure>
  </div>

  <div class="layout-all-center" v-if="scopeList.length != 0">
    <img class="product-scope-logo" :src="item" alt="Wondergate global payment scope and coverage" v-for="item in scopeList" />
  </div>

  <div class="layout-background-3">
    <div class="layout-content layout-horizontal-equalization">
      <h2 class="app-subtitle-text app-text-font">
        {{ $t('moo.product.globalTitle') }}
      </h2>
      <div class="app-description-text-small app-detail-font">
        {{ $t('moo.product.globalDescription') }}
      </div>

      <a-row :gutter="36" class="layout-content-subspacing">
        <a-col :span="8" v-for="item in globalList">
          <a-card :bordered="false" style="border-radius: 15px">
            <template #title>
              <img :src="item.path" :alt="$t(String(item.title))" />
            </template>
            <h3 class="app-color-text-main app-description-text-small app-detail-font app-text-description-title">
              {{ $t(String(item.title)) }}
            </h3>
            <div class="app-color-text-main app-detail-font app-text-description-spacing-top app-description-text-smaller">
              {{ $t(String(item.description)) }}
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>

  <FloatStructure :image-path="CardImage" alt="Wondergate virtual card issuing and global payment collection solutions">
    <template #content>
      <div class="app-subtitle-text app-text-font">
        {{ $t('moo.product.paymentMethodTitle') }}
      </div>
      <div class="app-description-text-small app-detail-font">
        {{ $t('moo.product.paymentMethodDescription') }}
      </div>
      <div class="app-description-text-small app-text-font layout-content-subspacing-small">
        {{ $t('moo.product.card') }}
      </div>
      <div class="layout-background-3 product-card-wrap">
        <a-row class="layout-all-center">
          <a-col :span="8" class="product-card-item-spacing">
            <img src="../../../assets/images/product/img_product_mastercard.png" alt="Mastercard cross-border payment network partner" />
          </a-col>
          <a-col :span="8" class="product-card-item-spacing">
            <img src="../../../assets/images/product/img_product_visa.png" alt="Visa global payment processing network" />
          </a-col>
          <a-col :span="8" class="product-card-item-spacing">
            <img src="../../../assets/images/product/img_product_dc.png" alt="Diners Club International B2B payment support" />
          </a-col>
        </a-row>
        <a-row class="layout-content-subspacing layout-all-center" style="justify-content: left">
          <a-col :span="8" class="product-card-item-spacing">
            <img src="../../../assets/images/product/img_product_ae.png" alt="American Express corporate payment solutions" />
          </a-col>
          <a-col :span="8" class="product-card-item-spacing">
            <img src="../../../assets/images/product/img_product_discover.png" alt="Discover Global Network cross-border payments" />
          </a-col>
        </a-row>
      </div>
      <div class="app-description-text-small app-text-font layout-content-subspacing-small">
        {{ $t('moo.product.local') }}
      </div>
      <div class="layout-background-3 product-card-wrap">
        <img src="../../../assets/images/product/img_product_local.png" alt="Local payment methods and alternative global payment options" />
      </div>
    </template>
  </FloatStructure>

  <div class="layout-background-3">
    <div class="layout-content product-settlement-wrap">
      <!-- <div class="app-description-text-small app-text-font">
        {{ $t('moo.product.settlementTitle') }}
      </div> -->
      <h2 class="app-title-text-small app-text-font">
        {{ $t('moo.product.settlementPayment') }}
      </h2>
      <div
        class="app-description-text-small app-detail-font product-settlement-description"
        v-html="$t('moo.product.settlementDescription')"
      ></div>
      <img src="../../../assets/images/product/img_settlement.png" alt="Cross-border payment settlement and multi-currency clearing process" />
    </div>
  </div>

  <div class="layout-content app-color-text-main layout-two-side-end layout-horizontal-equalization">
    <HalfStructure alignment-mode="top">
      <template #left>
        <!-- <div class="app-description-text-small app-text-font" layout-content-subspacing-small>
          {{ $t('moo.product.virtuallyPaymentTitle') }}
        </div> -->
        <h2 class="app-title-text-small app-text-font">
          {{ $t('moo.product.virtuallyPayment') }}
        </h2>
        <div
          class="app-description-text-small app-detail-font product-virtually-payment-description"
          v-html="$t('moo.product.virtuallyPaymentDescription')"
        ></div>
      </template>
      <template #right>
        <img
          class="layout-content-subspacing-small"
          src="../../../assets/images/product/img_virtually_payment.png"
          alt="Wondergate virtual payment API and global B2B payment integration"
        />
      </template>
    </HalfStructure>
  </div>

  <Footer></Footer>
</template>
<script setup lang="ts">
import FloatStructure from '@/components/structure/left-rigth/float/index.vue';
import HalfStructure from '@/components/structure/left-rigth/half/index.vue';
import Title from '@/components/header/title/index.vue';
import Footer from '@/components/footer/index.vue';
import ParagraphStructure from '@/components/structure/left-rigth/half/paragraph/index.vue';
import { ref } from 'vue';
import { ICard } from '@/interface/home';
import CrossBorderImage from '@/assets/images/product/img_product_cross_border.png';
import CostsImage from '@/assets/images/product/img_product_costs.png';
import ExperienceImage from '@/assets/images/product/img_product_experience.png';
import OptimizedImage from '@/assets/images/product/img_product_optimized.png';
import CardImage from '@/assets/images/product/img_product_card.png';
import TitleImage from '@/assets/images/product/img_product_title.png';

const crossBorderList = ref<ICard[]>([
  {
    title: 'moo.product.exchangeIssuesTitle',
    description: 'moo.product.exchangeIssuesDescription',
  },
  {
    title: 'moo.product.paymentChannelTitle',
    description: 'moo.product.paymentChannelDescription',
  },
  {
    title: 'moo.product.transactionSecurityTitle',
    description: 'moo.product.transactionSecurityDescription',
  },
]);

const scopeList = ref(
  Object.values(
    import.meta.glob('../../assets/images/product/scope/*', {
      eager: true,
    }),
  ).map((module: any) => module.default),
);

const globalList = ref<ICard[]>([
  {
    title: 'moo.product.experienceTitle',
    description: 'moo.product.experienceDescription',
    path: ExperienceImage,
  },
  {
    title: 'moo.product.optimizedTitle',
    description: 'moo.product.optimizedDescription',
    path: OptimizedImage,
  },
  {
    title: 'moo.product.costsTitle',
    description: 'moo.product.costsDescription',
    path: CostsImage,
  },
]);
</script>

<style scoped lang="less">
@import '@/styles/base.less';

.product-scope-logo {
  max-width: 8%;
}

.product-routing-description {
  padding: 2.1rem 0;
}

.product-card-wrap {
  margin-top: 0.8rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;

  .product-card-item-spacing {
    padding: 0 2.5rem;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

.product-virtually-payment-description {
  padding: 2.1rem 0 0;
}

.product-settlement-wrap {
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;

  .product-settlement-description {
    padding: 2rem 0;
  }
}
</style>
