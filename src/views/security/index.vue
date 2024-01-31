<template>
  <Header :is-dark="false"></Header>
  <div class="layout-background-2 app-header-distance">
    <div class="security-title-wrap">
      <div class="layout-content">
        <div class="app-title-text app-title-font app-color-text">
          {{ $t('moo.security.title') }}
        </div>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text security-title-content-description"
          v-html="$t('moo.security.titleDescription')">
        </div>
      </div>
    </div>
  </div>


  <div class="layout-background-3">
    <div class="app-color-text-main app-clean-float">
      <img class="security-risk-control-img" src="../../assets/images/security/img_risk_control.png" alt="product">
      <div class="layout-content security-risk-control-text-wrap">
        <div class="app-title-text-small  app-text-font">
          {{ $t('moo.product.paymentRouting') }}
        </div>
        <div class="app-description-text-small app-detail-font"
             v-html=" $t('moo.product.paymentRoutingDescription')">
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<script setup lang="ts">

import Button from '@/components/button/index.vue';
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
</script>

<style scoped lang="less">
.security-title-wrap {
  text-align: center;
  padding: 6rem 0 5rem;

  .security-title-content-description {
    padding-top: 3.3rem;
  }
}

.security-risk-control-img {
  width: auto;
  height: 35rem;
  float: right;
}

.security-risk-control-text-wrap {
  height: 35rem;
  padding-top: 17.5rem;
  transform: translateY(-8.75rem);
}

</style>
