<template>
  <Header :is-dark="false"></Header>
  <div class="layout-background-2 app-header-distance">
    <div class="structure-title-wrap">
      <div class="layout-content layout-two-side-center">
        <div class="structure-title-left">
          <div class="structure-title-notes">
            <star-filled class="structure-title-notes-text"/>
            <span class="structure-title-notes-text app-detail-font">{{ $t('moo.product.notes') }}</span>
          </div>
          <div class="app-title-text app-title-font home-title-padding-top app-color-text">
            {{ $t('moo.product.title') }}
          </div>
          <div class="app-title-text app-title-font home-title-padding-bottom app-color-white">
            {{ $t('moo.product.titleMain') }}
          </div>
          <div class="app-description-text-small app-detail-font home-title-padding app-color-white">
            {{ $t('moo.product.titleDescription') }}
          </div>
          <div class="title-button">
            <Button :is-dark="true"></Button>
          </div>
        </div>
        <div class="structure-title-right" style="right: 11rem">
          <img src="../../assets/images/product/img_product_title.png" alt="payment">
        </div>
      </div>
    </div>
  </div>

  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <ParagraphStructure></ParagraphStructure>
  </div>


  <div class="layout-background-3" id="paymentRouting">
    <div class="layout-content app-color-text-main layout-two-side-end">
      <div class="layout-horizontal-equalization">
        <div class="app-title-text-small  app-text-font">
          {{ $t('moo.product.paymentRouting') }}
        </div>
        <div class="app-description-text-small app-detail-font product-routing-description"
             v-html=" $t('moo.product.paymentRoutingDescription')">
        </div>
        <Button class="title-button"></Button>
      </div>
      <div class="layout-horizontal-equalization">
        <img src="../../assets/images/product/img_product_checkout.png" alt="product">
      </div>
    </div>
  </div>


  <div class="layout-content app-color-text-main layout-two-side-end">
    <div class="layout-horizontal-equalization">
      <div class="app-description-text-small app-text-font">
        {{ $t('moo.product.virtuallyPaymentTitle') }}
      </div>
      <div class="app-title-text-small app-text-font">
        {{ $t('moo.product.virtuallyPayment') }}
      </div>
      <div class="app-description-text-small app-detail-font product-virtually-payment-description"
           v-html=" $t('moo.product.virtuallyPaymentDescription')">
      </div>
    </div>
    <div class="layout-horizontal-equalization">
      <img src="../../assets/images/product/img_virtually_payment.png" alt="product">
    </div>
  </div>

  <div class="layout-background-3">
    <div class="layout-content product-settlement-wrap">
      <div class="app-description-text-small app-text-font">
        {{ $t('moo.product.settlementTitle') }}
      </div>
      <div class="app-title-text-small app-text-font">
        {{ $t('moo.product.settlementPayment') }}
      </div>
      <div class="app-description-text-small app-detail-font product-settlement-description"
           v-html=" $t('moo.product.settlementDescription')">
      </div>
      <img src="../../assets/images/product/img_settlement.png" alt="product">
    </div>
  </div>

  <Footer></Footer>

</template>
<script setup lang="ts">

import Header from '@/components/header/index.vue';
import Button from '@/components/button/index.vue';
import Footer from '@/components/footer/index.vue';
import ParagraphStructure from '@/components/structure/left-rigth/half/paragraph/index.vue';

</script>

<style scoped lang="less">
@import '@/styles/base';
@import '@/styles/structure';

.product-title-wrap {
  padding: 6.5rem 0;
  text-align: center;

  .product-title-description {
    padding: 3rem 0;
  }
}

.product-routing-description {
  padding: 2.1rem 0;
}

.product-virtually-payment-description {
  padding: 2.1rem 0 0;
}

.product-settlement-wrap {
  padding: 3.5rem 0;

  .product-settlement-description {
    padding: 2rem 0;
  }
}

</style>
