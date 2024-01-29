<template>
  <div>
    <Header></Header>
    <div class="home-title-wrap">
      <div class="layout-content layout-two-side">
        <div class="home-title-left">
          <div class="home-title-notes">
            <star-filled class="home-title-notes-text"/>
            <span class="home-title-notes-text">{{ $t('moo.home.labels') }}</span>
          </div>
          <div class="home-title-text">
            {{ $t('moo.home.title') }}
          </div>
          <div class="home-title-description">
            {{ $t('moo.home.titleDescription') }}
          </div>

          <Button :is-dark="true" class="title-button"></Button>
        </div>
        <div class="home-title-right">
          <img src="@/assets/images/home/title_amount_detail.png" alt="amount">
          <img src="@/assets/images/home/title_payment_detail.png" alt="payment">
        </div>
      </div>

      <div class="data-item-wrap layout-content layout-two-side">
        <div v-for="item in dataList">
          <div class="data-item-top">{{ $t(item.data) }}</div>
          <div class="data-item-bottom">{{ $t(item.tip) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Button from '@/components/button/index.vue';


const dataList = [
  {
    data: 'moo.home.globalPaymentData',
    tip: 'moo.home.GlobalPaymentTips',
  },
  {
    data: 'moo.home.customersData',
    tip: 'moo.home.customersTip',
  },
  {
    data: 'moo.home.countriesData',
    tip: 'moo.home.countriesTip',
  },
  {
    data: 'moo.home.cooperatingData',
    tip: 'moo.home.cooperatingTip',
  },
];


</script>

<style lang="less" scoped>
@import '@/styles/base.less';

@top-distance: @header-height+3.5rem;
@top-title-height: 25rem;


.home-title-wrap {
  position: relative;
  padding-top: @top-distance;
  padding-bottom: 20px;
  background: @color-bg;

  .home-title-left {
    position: relative;
    width: 30rem;
    height: @top-title-height;

    .home-title-notes {
      display: inline-block;
      background: @color-bg1;
      border-radius: 15px;
      padding: 2px .3rem;


      .home-title-notes-text {
        display: inline-block;
        font-size: 1rem;
        font-family: textFont, serif;
        font-weight: 500;
        text-align: center;
        color: @color-bg;
        padding: 0 5px;
      }
    }

    .home-title-text {
      font-size: 2.5rem;
      font-family: titleFont, serif;
      font-weight: bolder;
      color: @color-title;
      line-height: 3.5rem;
      padding: 15px 0;
    }

    .home-title-description {
      font-size: 1rem;
      font-family: textFont, serif;
      font-weight: bolder;
      color: @color-title;
    }

    .title-button {
      position: absolute;
      bottom: 0;
      left: 0;
    }


  }

  .home-title-right {
    display: flex;
    position: absolute;
    right: -4rem;
    top: @top-distance;

    img {
      height: @top-title-height;

      &:first-child {
        margin-right: 1rem;
      }
    }

  }

  .data-item-wrap {
    margin-top: 3rem;

    .data-item-top {
      font-family: titleFont, serif;
      font-weight: bolder;
      color: @color-title;
      line-height: 1.4rem;
      font-size: 1.6rem;
      padding-bottom: .6rem;
    }

    .data-item-bottom {
      font-size: .8rem;
      font-family: textFont, serif;
      color: @color-title;
    }
  }

}

</style>
