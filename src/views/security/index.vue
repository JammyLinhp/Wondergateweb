<template>
  <Header></Header>
  <div class="layout-background-2 app-header-distance">
    <div class="security-title-wrap">
      <div class="layout-content">
        <div class="app-title-text app-title-font app-color-text">
          {{ $t('moo.security.title') }}
        </div>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text security-title-content-description"
          v-html="$t('moo.security.titleDescription')"
        ></div>
      </div>
    </div>
  </div>

  <div class="layout-content layout-horizontal-equalization">
    <div class="app-title-text-small app-text-font">
      {{ $t('moo.security.riskControl') }}
    </div>
    <div
      class="app-description-text-small app-detail-font"
      v-html="$t('moo.security.riskControlDescription')"
    ></div>
    <HalfStructure alignment-mode="top">
      <template #left>
        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.identityVerification')"
        ></div>

        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.transactionMonitoring')"
        ></div>

        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.riskAssessment')"
        ></div>

        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.preventionStrategies')"
        ></div>

        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.complianceManagement')"
        ></div>

        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.dataSecurity')"
        ></div>
      </template>
      <template #right>
        <img
          class="security-chargeback-alerts-description"
          src="@/assets/images/security/img_risk_control.png"
          alt="security"
        />
      </template>
    </HalfStructure>
  </div>

  <div
    class="layout-content app-color-text-main layout-horizontal-equalization"
  >
    <HalfStructure alignment-mode="top">
      <template #left>
        <img
         class="layout-content-subspacing-small"
          src="../../assets/images/security/img_chargeback_alerts.png"
          alt="security"
        />
      </template>
      <template #right>
        <div class="app-title-text-small app-text-font layout-content-subspacing-small">
          {{ $t('moo.security.chargebackAlerts') }}
        </div>
        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.chargebackAlertsDescription')"
        ></div>
      </template>
    </HalfStructure>
  </div>

  <div class="layout-background-3 layout-horizontal-equalization">
    <div class="layout-content app-color-text-main">
      <HalfStructure alignment-mode="top">
        <template #left>
          <img
            class="layout-content-subspacing-small"
            src="../../assets/images/home/img_convenient_system.png"
            alt="security"
          />
        </template>
        <template #right>
          <div
            class="app-title-text-small app-text-font layout-content-subspacing-small"
          >
            {{ $t('moo.security.customerService') }}
          </div>
          <div
            class="app-description-text-small app-detail-font security-chargeback-alerts-description"
            v-html="$t('moo.security.customerServiceDescription')"
          ></div>
        </template>
      </HalfStructure>
    </div>
  </div>

  <div class="app-color-text-main app-clean-float">
    <FloatStructure height="38rem" :image-path="BusinessImage" :is-left="true">
      <template #content>
        <div class="app-title-text-small app-text-font">
          {{ $t('moo.security.business') }}
        </div>
        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description"
          v-html="$t('moo.security.businessDescription')"
        ></div>
      </template>
    </FloatStructure>
  </div>

  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import HalfStructure from '@/components/structure/left-rigth/half/index.vue';
import FloatStructure from '@/components/structure/left-rigth/float/index.vue';
import BusinessImage from '@/assets/images/security/img_business.png';
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
