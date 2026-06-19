<template>
  <Header></Header>
  <meta name="title" content="Wondergate Co., Limited | Global Acquiring & Issuing Services" />
  <meta
    name="description"
    content="Founded in Hong Kong by payment technology experts, Wondergate provides secure and efficient cross-border payment services. We bridge the gap in the global digital economy with modern financial infrastructure."
  />
  <div class="layout-background-2 app-header-distance">
    <div class="about-title-wrap">
      <div class="layout-content">
        <h1 class="app-title-text app-title-font app-color-text">
          {{ $t('moo.about.title') }}
        </h1>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text about-title-description"
          v-html="$t('moo.about.titleDescription')"
        ></div>
      </div>
    </div>
  </div>

  <div class="layout-background-3">
    <FloatStructure height="38rem" :image-path="CompanyProfile" alt="Wondergate cross-border payment platform and global acquiring network">
      <template #content>
        <h2 class="app-title-text-small app-text-font">
          {{ $t('moo.about.companyProfile') }}
        </h2>
        <div
          class="app-description-text-small app-detail-font about-company-profile-description"
          v-html="$t('moo.about.companyProfileDescription')"
        ></div>
      </template>
    </FloatStructure>
  </div>

  <div class="about-provide-wrap">
    <div class="layout-content">
      <h2 class="app-title-text-small app-text-font">
        {{ $t('moo.about.provide') }}
      </h2>
      <div
        class="app-description-text app-text-font about-company-profile-description"
        v-html="$t('moo.about.provideDescription')"
      ></div>
    </div>
  </div>

  <div class="about-logo-image layout-content">
    <img src="../../assets/images/about-us/logo_platform.png" alt="Wondergate global payment platform and infrastructure" />
  </div>

  <div class="layout-content about-logo-image">
    <img src="../../assets/images/about-us/img_provide.png" alt="Wondergate provides cross-border payment and virtual card solutions" />
  </div>

  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import FloatStructure from '@/components/structure/left-rigth/float/index.vue';
import CompanyProfile from '@/assets/images/about-us/img_company_profile.png';
</script>

<style lang="less" scoped>
.about-title-wrap {
  text-align: center;
  padding: 3.7rem 0;
}

.about-title-description {
  padding-top: 3.7rem;
}

.security-risk-control-img {
  width: auto;
  height: 38rem;
  float: right;
  padding-left: 3rem;
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
