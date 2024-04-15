<template>
  <Header :is-dark="true"></Header>
  <div class="app-header-distance"></div>
  <div class="layout-background-3">
    <div class="layout-content">
      <div class="layout-content-padding-top layout-content-padding-bottom">
        <div class="app-title-font app-subtitle-text">DISCLAIMER</div>
        <div
          class="app-description-text-small app-detail-font layout-content-subspacing-small"
        >
          <p>
            Any information contained in this or any other Wondergate.io website
            should not be construed as legal advice and is not intended to be a
            substitute for legal counsel on any subject matter. The contents of
            this site are for general information purposes only. Whilst we
            endeavour to ensure that the information on this site is correct, no
            warranty, express or implied, is given as to its accuracy and we do
            not accept any liability for error or omission. We shall not be
            liable for any damage (including, without limitation, damage for
            loss of business or loss of profits) arising in contract, tort or
            otherwise from the use of, or inability to use, this site or any
            material contained in it, or from any action or decision taken as a
            result of using this site or any such material. Some of the material
            on this site may have been prepared some time ago.
          </p>
          <p>
            Certain parts of this site may link to external internet sites, and
            other external internet sites may link to this website.
            Wondergate.io is not responsible for the content of any external
            internet sites and has no control over the nature, content and
            availability of those sites. The use of any links to external
            internal sites does not constitute an endorsement, guarantee or
            approval by Wondergate.io for any of the products, services,
            information, opinions or any other contents contained. Wondergate.io
            bears no responsibility for the accuracy, legality or content of the
            external site or for that of subsequent links.
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

<style lang="less"></style>
