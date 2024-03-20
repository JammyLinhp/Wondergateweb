<template>
  <Header :is-dark="true"></Header>
  <div class="app-header-distance"></div>
  <div class="layout-background-3">
    <FloatStructure height="38rem" :image-path="ContactImage">
      <template #content>
        <div class="app-title-text app-title-font app-color-text-main">
          {{ $t("moo.contact.toBegin") }}
        </div>
        <div class="app-description-text-small app-detail-font contact-description" v-html="$t('moo.contact.youWant')"></div>
        <div class="layout-content-subspacing">
          <a-row
            :gutter="36"
            class="layout-content-subspacing-small app-color-text-main app-description-text-small app-detail-font app-text-description-title"
            v-for="item in informationList">
            <a-col :span="6">
              <div>{{ $t(String(item.title)) }} :</div>
            </a-col>
            <a-col :span="18">
              <div>
                {{ $t(String(item.description)) }}
              </div>
            </a-col>
          </a-row>
        </div>
      </template>
    </FloatStructure>
  </div>
  <Footer :is-display-button="false"></Footer>
</template>

<script setup lang="ts">
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
import FloatStructure from "@/components/structure/left-rigth/float/index.vue";
import ContactImage from "@/assets/images/contact-us/img_contact_title.png";
import { ref } from "vue";
import { ICard } from "@/interface/home";

const informationList = ref<ICard[]>([
  {
    title: "moo.contact.email",
    description: "info@wondergatetech.com",
  },
  { title: "moo.contact.officeAddress", description: "moo.contact.address" },
]);
</script>

<style lang="less" scoped>
@import "@/styles/base";

.contact-description {
  padding: 1.65rem 0;
}
</style>
