<template>
  <Header></Header>
  <meta name="title" content="Payment Security & AML Compliance | Wondergate Risk Management" />
  <meta
    name="description"
    content="Wondergate provides a robust risk management framework featuring real-time transaction monitoring, AML compliance, and customer identity verification. Ensure payment security and full traceability for every global transaction."
  />
  <meta
    name="keywords"
    content="Payment Security, Risk Management, AML Compliance, Transaction Monitoring, Chargeback Management, payment processing security, Payment Solutions for Global Industries"
  />
  <div class="layout-background-2 app-header-distance">
    <div class="security-title-wrap">
      <div class="layout-content">
        <h1 class="app-title-text app-title-font app-color-text">
          {{ $t('moo.security.title') }}
        </h1>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text security-title-content-description"
          v-html="$t('moo.security.titleDescription')"
        ></div>
      </div>
    </div>
  </div>

  <!-- <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <HalfStructure alignment-mode="top">
      <template #left>
        <div class="layout-content-subspacing-small">
          <div class="security-compliance-wrap">
            <div class="layout-all-center security-compliance-title">{{ $t('moo.security.msoLicensePlate') }}</div>
            <img
              class="security-compliance-img"
              src="../../assets/images/security/img_security_compliance.png"
              alt="Wondergate security compliance and international regulatory certifications"
            />
          </div>
        </div>
      </template>
      <template #right>
        <div class="app-title-text-small app-text-font layout-content-subspacing-small">
          {{ $t('moo.security.complianceTitle') }}
        </div>
        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description security-compliance-text"
          v-html="$t('moo.security.complianceParagraphOne')"
        ></div>
        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description security-compliance-text"
          v-html="$t('moo.security.complianceParagraphTwo')"
        ></div>
        <div
          class="app-description-text-small app-detail-font security-chargeback-alerts-description security-compliance-text"
          v-html="$t('moo.security.complianceParagraphThree')"
        ></div>
      </template>
    </HalfStructure>
  </div> -->

  <div class="layout-content layout-horizontal-equalization">
    <h2 class="app-title-text-small app-text-font">
      {{ $t('moo.security.riskControl') }}
    </h2>
    <div class="app-description-text-small app-detail-font" v-html="$t('moo.security.riskControlDescription')"></div>
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
          alt="Wondergate AI-powered risk control and transaction monitoring dashboard"
        />
      </template>
    </HalfStructure>
  </div>

  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <HalfStructure alignment-mode="top">
      <template #left>
        <img
          class="layout-content-subspacing-small"
          src="../../assets/images/security/img_chargeback_alerts.png"
          alt="Real-time chargeback alerts and fraud detection system"
        />
      </template>
      <template #right>
        <h2 class="app-title-text-small app-text-font layout-content-subspacing-small">
          {{ $t('moo.security.chargebackAlerts') }}
        </h2>
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
            alt="Wondergate 24/7 global payment customer support and service"
          />
        </template>
        <template #right>
          <h2 class="app-title-text-small app-text-font layout-content-subspacing-small">
            {{ $t('moo.security.customerService') }}
          </h2>
          <div
            class="app-description-text-small app-detail-font security-chargeback-alerts-description"
            v-html="$t('moo.security.customerServiceDescription')"
          ></div>
        </template>
      </HalfStructure>
    </div>
  </div>

  <div class="app-color-text-main app-clean-float">
    <FloatStructure height="38rem" :image-path="BusinessImage" :is-left="true" alt="Wondergate global payment security and compliance infrastructure">
      <template #content>
        <h2 class="app-title-text-small app-text-font">
          {{ $t('moo.security.business') }}
        </h2>
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
@import '@/styles/base.less';

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

.security-compliance-wrap {
  display: inline-block;
  background-color: #fcfcfc;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);

  .security-compliance-title {
    height: 60px;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0;
  }

  .security-compliance-img {
    height: 25rem;
    padding: 0 15px 15px;
    object-fit: contain;
    width: auto;
  }
}
.security-compliance-text {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 1.6rem;
    left: -34px;
    margin-left: 6px;
    margin-top: 6px;
    max-width: 12px;
    max-height: 12px;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background-color: @color-bg;
  }

  &::after {
    content: '';
    position: absolute;
    top: 1.6rem;
    left: -34px;
    width: 1.68rem;
    height: 1.68rem;
    max-width: 24px;
    max-height: 24px;
    border-radius: 50%;
    background-color: transparent;
    border: 1.8px @color-bg solid;
  }
}

@media screen and (min-width: 771px) and (max-width: 990px) {
  .security-compliance-text {
    &::before {
      margin-left: 5px;
      margin-top: 5px;
    }

    // &::after {
    // }
  }
}

@media (max-width: 770px) {
  .security-compliance-text {
    &::before {
      display: none;
    }

    &::after {
      display: none;
    }
  }
}
</style>
