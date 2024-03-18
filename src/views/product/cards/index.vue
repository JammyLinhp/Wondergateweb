<template>
  <Title notes="moo.menu.issuingVirtualCards"
         title="moo.cards.enjoy"
         title-main="moo.cards.experience"
         title-description="moo.cards.titleDescription" :image-path="TitleImage"></Title>

  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <ParagraphStructure :paragraph-array="digitalList"
                        :image-path="DigitalImage"
                        title="moo.cards.digitalSolution">
    </ParagraphStructure>
  </div>

  <div class="layout-background-3">
    <div class="layout-content app-color-text-main layout-horizontal-equalization">
      <ParagraphStructure :paragraph-array="virtualCardsList"
                          :image-path="VirtualCardsImage"
                          title="moo.cards.virtualCards">
      </ParagraphStructure>
    </div>
  </div>

  <div class="layout-content app-color-text-main layout-horizontal-equalization">
    <StepComponents :step-list="stepList"
                    title="moo.cards.embarkTitle"
                    description="moo.cards.embarkDescription">

    </StepComponents>
  </div>

  <Footer></Footer>

</template>
<script setup lang="ts">
import Title from '@/components/header/title/index.vue';
import Footer from '@/components/footer/index.vue';
import ParagraphStructure from '@/components/structure/left-rigth/half/paragraph/index.vue';
import { ref } from 'vue';
import { ICard } from '@/interface/home';
import TitleImage from '@/assets/images/cards/img_cards_title.png';
import DigitalImage from '@/assets/images/cards/img_cards_digital.png';
import VirtualCardsImage from '@/assets/images/cards/img_cards_virtual_card.png';
import StepOneImage from '@/assets/images/cards/img_cards_step_one.png';
import StepTwoImage from '@/assets/images/cards/img_cards_step_two.png';
import StepThreeImage from '@/assets/images/cards/img_cards_step_three.png';
import StepComponents from '@/components/step/index.vue';

const digitalList = ref<ICard[]>([
  { title: 'moo.cards.quickTitle', description: 'moo.cards.quickDescription' },
  { title: 'moo.cards.acceptanceTitle', description: 'moo.cards.acceptanceDescription' },
  { title: 'moo.cards.mindTitle', description: 'moo.cards.mindDescription' },
  { title: 'moo.cards.settingsTitle', description: 'moo.cards.settingsDescription' },
]);

const virtualCardsList = ref<ICard[]>([
  { title: 'moo.cards.futureTitle', description: 'moo.cards.futureDescription' },
  { title: 'moo.cards.efficientTitle', description: 'moo.cards.efficientDescription' },
  { title: 'moo.cards.supportTitle', description: 'moo.cards.supportDescription' },
]);


const stepList = ref<ICard[]>([
  {
    title: 'moo.home.stepOne',
    description: 'moo.cards.createCard',
    path: StepOneImage,
  },
  {
    title: 'moo.home.stepTow',
    description: 'moo.cards.recharge',
    path: StepTwoImage,
  },
  {
    title: 'moo.home.stepThree',
    description: 'moo.cards.useCard',
    path: StepThreeImage,
  },
]);

</script>

<style scoped lang="less">
@import '@/styles/base';


</style>
