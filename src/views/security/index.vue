<template>
  <Header></Header>
  <div class="layout-background-1 app-header-distance">
    <div class="security-title-wrap">
      <div class="layout-content">
        <div class="app-title-text app-title-font app-color-text-dark">
          {{ $t('moo.security.title') }}
        </div>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text-dark security-title-content-description"
          v-html="$t('moo.security.titleDescription')">
        </div>
      </div>
    </div>
  </div>


  <div id="riskControl" class="layout-background-3">
    <div class="app-color-text-main app-clean-float">
      <img class="security-risk-control-img" src="../../assets/images/security/img_risk_control.png" alt="security">
      <div class="layout-content security-risk-control-text-wrap">
        <div class="app-title-text-small  app-text-font">
          {{ $t('moo.security.riskControl') }}
        </div>
        <div class="app-description-text-small app-detail-font security-chargeback-alerts-description"
             v-html=" $t('moo.security.riskControlDescription')">
        </div>
      </div>
    </div>
  </div>

  <div id="chargebackAlerts" class="layout-content app-color-text-main layout-two-side-center">
    <div class="layout-horizontal-equalization">
      <img src="../../assets/images/security/img_chargeback_alerts.png" alt="security">
    </div>
    <div class="layout-horizontal-equalization">
      <div class="app-title-text-small app-text-font">
        {{ $t('moo.security.chargebackAlerts') }}
      </div>
      <div class="app-description-text-small app-detail-font security-chargeback-alerts-description"
           v-html=" $t('moo.security.chargebackAlertsDescription')">
      </div>
    </div>
  </div>

  <div id="customerService" class="layout-background-3">
    <div class="layout-content app-color-text-main layout-two-side-center">
      <div class="layout-horizontal-equalization">
        <img src="../../assets/images/home/img_convenient_system.png" alt="security">
      </div>
      <div class="layout-horizontal-equalization">
        <div class="app-title-text-small app-text-font">
          {{ $t('moo.security.customerService') }}
        </div>
        <div class="app-description-text-small app-detail-font security-chargeback-alerts-description"
             v-html=" $t('moo.security.customerServiceDescription')">
        </div>
      </div>
    </div>
  </div>

  <div id="business" class="app-color-text-main app-clean-float">
    <img class="security-business-img" src="../../assets/images/security/img_business.png" alt="security">
    <div class="layout-content security-business-text-wrap">
      <div class="app-title-text-small  app-text-font">
        {{ $t('moo.security.business') }}
      </div>
      <div class="app-description-text-small app-detail-font security-chargeback-alerts-description"
           v-html=" $t('moo.security.businessDescription')">
      </div>
    </div>
  </div>


  <Footer></Footer>
</template>

<script setup lang="ts">
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
  height: 38rem;
  float: right;
  padding-left: 10rem;
}

.security-risk-control-text-wrap {
  height: 38rem;
  padding-top: 8rem;
}

.security-chargeback-alerts-description {
  padding-top: 1.5rem;
}

.security-business-img {
  width: auto;
  height: 38rem;
  float: left;
  padding-right: 10rem;
}

.security-business-text-wrap {
  height: 38rem;
  padding-top: 19rem;
  transform: translateY(-4.75rem);
}
</style>
