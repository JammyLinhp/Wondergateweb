<template>
  <!-- 加载状态 -->
  <div class="carousel-loading" v-if="loading">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading...</div>
    </div>
  </div>

  <!-- 有图片时显示轮播 -->
  <div class="official-carousel" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" v-else-if="slides.length > 0">
    <div class="carousel-container">
      <div
        class="carousel-track"
        :style="{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease' : 'none',
        }"
        @transitionend="handleTransitionEnd"
      >
        <div class="carousel-slide" @click="handleSlideClick(slides[slides.length - 1])">
          <img :src="slides[slides.length - 1].image" :alt="slides[slides.length - 1].alt" />
        </div>

        <div class="carousel-slide" v-for="(slide, index) in slides" :key="index" @click="handleSlideClick(slide)">
          <img :src="slide.image" :alt="slide.alt" />
        </div>

        <div class="carousel-slide" @click="handleSlideClick(slides[0])">
          <img :src="slides[0].image" :alt="slides[0].alt" />
        </div>
      </div>

      <div class="carousel-dots">
        <button
          v-for="(_, index) in slides"
          :key="index"
          class="carousel-dot"
          :class="{ active: index === realIndex }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </div>

  <!-- 无图片时显示文字 -->
  <div class="layout-background-2 app-header-distance" v-else>
    <div class="banner-title-wrap">
      <div class="layout-content">
        <div class="app-title-text app-title-font app-color-text">
          {{ $t('moo.about.globalPayoutsSimplified') }}
        </div>
        <div
          class="app-description-text app-detail-font app-text-font app-color-text banner-title-description"
          v-html="$t('moo.about.connectingTheWorld')"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getBannerList } from '@/utils/api';

const currentIndex = ref(1); // 从 1 开始（因为第 0 项是克隆的最后一张）
const isTransitioning = ref(false);

interface Slide {
  image: string;
  alt: string;
  targetUrl: string;
}

// 轮播图数据
const slides = ref<Slide[]>([]);

// 加载状态
const loading = ref(true);

const realIndex = computed(() => {
  if (currentIndex.value === 0) return slides.value.length - 1;
  if (currentIndex.value === slides.value.length + 1) return 0;
  return currentIndex.value - 1;
});

const goToSlide = (index: number) => {
  currentIndex.value = index + 1; // 因为真实图片从 1 开始
  isTransitioning.value = true;
};

const nextSlide = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value++;
};

const handleTransitionEnd = () => {
  isTransitioning.value = false;

  if (currentIndex.value === 0) {
    setTimeout(() => {
      currentIndex.value = slides.value.length;
    }, 0);
  }

  if (currentIndex.value === slides.value.length + 1) {
    setTimeout(() => {
      currentIndex.value = 1;
    }, 0);
  }
};

// 自动轮播
let autoPlayTimer: number | undefined;

const startAutoPlay = () => {
  autoPlayTimer = window.setInterval(() => {
    nextSlide();
  }, 3000);
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
  }
};

onMounted(() => {
  getBannerList().then((res: any) => {
    // 只使用有图片的项，不再添加默认图片
    slides.value = res
      .filter((item: any) => item.imageUrl) // 过滤掉没有图片的项
      .map((item: any) => ({
        image: item.imageUrl,
        alt: item.title || '',
        targetUrl: item.targetUrl || '',
      }));

    // 只有当有图片时才开始自动轮播
    if (slides.value.length > 0) {
      startAutoPlay();
    }
    currentIndex.value = 1;
  }).finally(() => {
    loading.value = false;
  });
});

// 处理轮播图点击事件
const handleSlideClick = (slide: Slide) => {
  if (slide.targetUrl) {
    window.open(slide.targetUrl, '_blank');
  }
};

// 鼠标悬停时停止自动轮播
const handleMouseEnter = () => {
  stopAutoPlay();
};

const handleMouseLeave = () => {
  startAutoPlay();
};
</script>

<style scoped lang="less">
@import '@/styles/base.less';

.carousel-loading {
  position: relative;
  width: 100%;
  height: 30rem;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-content {
    text-align: center;

    .loading-spinner {
      width: 4rem;
      height: 4rem;
      border: 0.4rem solid rgba(0, 0, 0, 0.1);
      border-left-color: @color-bg;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    .loading-text {
      font-size: 1.2rem;
      color: @color-bg;
    }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
}

.official-carousel {
  position: relative;
  width: 100%;
  height: 30rem;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 2rem;
  &:hover {
    .carousel-arrow {
      opacity: 1;
    }
  }

  .carousel-container {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;

    &:hover {
      .carousel-arrow {
        opacity: 1;
      }
    }

    .carousel-track {
      display: flex;
      height: 100%;
    }

    .carousel-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 4rem;
      height: 4rem;
      font-size: 2rem;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }

      &.prev-arrow {
        left: 2rem;
      }

      &.next-arrow {
        right: 2rem;
      }
    }

    .carousel-dots {
      position: absolute;
      bottom: 2rem;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 1rem;

      .carousel-dot {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        border: none;
        cursor: pointer;
        padding: 0;
        transition: all 0.3s ease;

        &.active {
          background: #fff;
          width: 2rem;
          border-radius: 0.5rem;
        }
      }
    }
  }
}
.banner-title-wrap {
  height: 26.65rem;
  text-align: center;
  padding: 7rem 0;
}

.banner-title-description {
  padding-top: 5rem;
}
@media (max-width: 770px) {
  .carousel-loading {
    height: 25rem;

    .loading-content {
      .loading-spinner {
        width: 3rem;
        height: 3rem;
        border-width: 0.3rem;
      }

      .loading-text {
        font-size: 1rem;
      }
    }
  }
  .banner-title-wrap {
    height: 19.65rem;
    padding: 2rem 0;
  }
  .official-carousel {
    height: 25rem;

    .carousel-container {
      .carousel-arrow {
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;

        &.prev-arrow {
          left: 1rem;
        }

        &.next-arrow {
          right: 1rem;
        }
      }

      .carousel-dots {
        bottom: 1rem;
        gap: 0.5rem;

        .carousel-dot {
          width: 0.8rem;
          height: 0.8rem;

          &.active {
            width: 1.5rem;
          }
        }
      }
    }
  }
}
</style>
