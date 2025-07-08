<template>
  <Header :is-dark="true"></Header>
  <div class="app-header-distance"></div>
  <div class="layout-background-3">
    <div class="layout-content">
      <div class="layout-content-padding-top layout-content-padding-bottom disclaimer-int">
        <div class="app-title-font app-title-text" style="padding-bottom: 1.5rem;">DISCLAIMER</div>
        <div class="app-description-text-small app-detail-font layout-content-subspacing-small disclaimer-content">
          <p>
            The information provided on this website, including but not limited to policy documents, rate schedules,
            operational guidelines, compliance statements, and other materials (collectively, “Content”), is for general
            informational purposes only. It does not constitute, and shall not be construed as, legal, regulatory,
            financial, or investment advice under any jurisdiction.
          </p>
          <p>
            No part of the Content on this website shall be interpreted as a guarantee, certification, or endorsement of
            the compliance status of specific transactions, nor as a representation of the suitability, availability,
            commercial value, or legality of any services. Users are solely responsible for ensuring that the use of our
            products or services is lawful under the laws and regulations of their respective jurisdictions.
          </p>
          <p>
            Third-party content or references (such as documents from regulatory authorities or industry standards) are
            provided for convenience only. Wondergate.io does not warrant the accuracy, completeness, or timeliness of
            any such materials. Responsibility for verifying the validity of third-party content rests with the original
            sources.
          </p>
          <p>
            While reasonable efforts are made to ensure the accuracy and currency of the Content, Wondergate.io makes no
            representations or warranties of any kind, express or implied, about the completeness, accuracy,
            reliability, suitability, or availability of the website or any information contained herein. Some content
            may refer to historical or outdated materials; the latest officially published versions shall prevail in all
            cases.
          </p>
          <p>
            We reserve the right to modify, update, or remove any Content, or to amend this Disclaimer, at any time
            without prior notice. Continued use of the website or services following such modifications constitutes
            acceptance of the updated terms.
          </p>
          <p>
            To the fullest extent permitted by law, Wondergate.io shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages, including but not limited to loss of profits,
            business interruption, or loss of data, arising out of or in connection with the use of, inability to use,
            or reliance on any content on this website.
          </p>
          <p>
            This website may contain links to third-party websites. These links are provided solely for your
            convenience. Wondergate.io does not endorse, approve, control, or assume responsibility for the content,
            availability, or accuracy of any external sites or any products, services, or information contained therein.
            Wondergate.io shall not be liable for any damages or losses resulting from the use of any third-party
            websites.
          </p>
          <p class="content-title">Governing Law</p>
          <p>
            This Disclaimer and any use of the website shall be governed by and construed in accordance with the laws of
            the Hong Kong Special Administrative Region (HKSAR), without regard to its conflict of law rules. Use of
            this website in jurisdictions where such content or use is unlawful is strictly prohibited. Users are
            responsible for complying with all applicable laws in their local jurisdiction.
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
</script>

<style lang="less">
.disclaimer-content p {
  line-height: 26px;
}
.content-title {
  font-weight: 800;
}
.disclaimer-int {
  padding-top: 2.8rem;
  padding-bottom: 4.5rem;
}
</style>
