<template>
  <Header></Header>
  <div class="layout-background-1 app-header-distance">
    <div class="about-title-wrap">
      <div class="layout-content">
        <div class="app-title-text app-title-font app-color-text-dark">
          {{ $t('moo.about.title') }}
        </div>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text-dark about-title-description"
          v-html="$t('moo.about.titleDescription')">
        </div>
      </div>
    </div>
  </div>

  <div class="layout-background-3">
    <div class="app-color-text-main app-clean-float">
      <img class="security-risk-control-img" src="../../assets/images/about-us/img_company_profile.png" alt="us">
      <div id="companyProfile" class="layout-content security-risk-control-text-wrap">
        <div class="app-title-text-small  app-text-font">
          {{ $t('moo.about.companyProfile') }}
        </div>
        <div class="app-description-text-small app-detail-font about-company-profile-description"
             v-html=" $t('moo.about.companyProfileDescription')">
        </div>
      </div>
    </div>
  </div>

  <div id="provide" class="about-provide-wrap">
    <div class="layout-content">
      <div class="app-title-text-small  app-text-font">
        {{ $t('moo.about.provide') }}
      </div>
      <div class="app-description-text app-text-font about-company-profile-description"
           v-html=" $t('moo.about.provideDescription')">
      </div>
    </div>
  </div>

  <div class="about-logo-image layout-content">
    <img src="../../assets/images/about-us/logo_platform.png" alt="platform">
  </div>

  <div class="layout-content about-logo-image">
    <img src="../../assets/images/about-us/img_provide.png" alt="provide">
  </div>

  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
</script>

<style lang="less" scoped>

.about-title-wrap {
  text-align: center;
  padding: 6.7rem 0;
}

.about-title-description {
  padding-top: 3.7rem;
}

.security-risk-control-img {
  width: auto;
  height: 38rem;
  float: right;
  padding-left: 10rem;
}

.security-risk-control-text-wrap {
  height: 38rem;
  padding-top: 7.5rem;
}

.about-company-profile-description {
  padding-top: 1.65rem;
}

.about-provide-wrap {
  text-align: center;
  padding: 4.3rem 0;
}

.about-logo-image {
  padding-bottom: 6.6rem;
}


</style>
