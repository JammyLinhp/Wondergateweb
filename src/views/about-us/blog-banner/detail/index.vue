<template>
  <div class="layout-background-2">
    <Header></Header>
    <div class="layout-background-2 app-header-distance"></div>
  </div>
  <div class="blog-detail-container">
    <div class="layout-content">
      <div class="app-color-text-main">
        <a-spin v-if="loading" tip="Loading..." class="loading-container">
          <div class="spin-content"></div>
        </a-spin>
        <div v-else>
          <!-- 面包屑 -->
          <div class="blog-breadcrumb">
            <a @click="onButtonClick('/about-us', ['moo.menu.aboutUs', 'moo.menu.aboutUsSub'])">About Us </a>
            <span class="breadcrumb-separator"> / </span>
            <a @click="onButtonClick('/about-us/blog-banner', ['moo.menu.aboutUs', 'moo.menu.blogBanner'])">Blog </a>
            <span class="breadcrumb-separator"> / </span>
            <span class="breadcrumb-current">{{
              tabs.find((item: any) => item.key === blogDetail.categoryId)?.title || ''
            }}</span>
          </div>

          <!-- 大标题 -->
          <h1 class="blog-title">{{ blogDetail.title }}</h1>

          <!-- 小标题及时间 -->
          <div class="blog-meta">
            <span class="blog-subtitle">{{ tabs.find((item: any) => item.key === blogDetail.categoryId)?.title || '' }}</span>
            <span class="blog-divider">|</span>
            <span class="blog-date">{{ blogDetail.publishedAt }}</span>
          </div>

          <!-- 正文 -->
          <div class="blog-content" v-html="blogDetail.content"></div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import { ref, onMounted } from 'vue';
import { getPostDetail, getPostCategories } from '@/utils/api';
import { useRoute, useRouter } from 'vue-router';
// 获取路由参数
const route = useRoute();
const router = useRouter();
const newsId = route.params.id;
const tabs: any = ref([]);
const SAVE_KEY: any = 'header_key';
// 博客详情数据
const blogDetail: any = ref({});
// 加载状态
const loading = ref(true);
const onButtonClick = (path: any, listKeys: any) => {
  router.push({ path });
  window.localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      currentKey: listKeys[1],
      openKeys: listKeys,
    }),
  );
};
// 模拟根据ID获取详情数据
onMounted(async () => {
  try {
    await getPostCategories().then((res: any) => {
      tabs.value = res.map((item: any) => ({
        key: item.id.toString(),
        title: item.name,
      }));
    });
    await getPostDetail(newsId).then((res: any) => {
      blogDetail.value = res;
    });
  } catch (error) {
    console.error('Error fetching blog detail:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="less" scoped>
@import '@/styles/base.less';

.blog-detail-container {
  padding: 4rem 0;
  background: @color-white;
}

.app-color-text-main {
  max-width: 1000px;
  margin: 0 auto;

  .blog-breadcrumb {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: @color-text-2;

    a {
      text-decoration: none;

      &:hover {
        color: @color-bg;
      }
    }

    .breadcrumb-separator {
      margin: 0 0.5rem;
      color: @color-text-2;
    }

    .breadcrumb-current {
      color: @color-text-1;
      font-weight: 500;
    }
  }

  .blog-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: @color-text-1;
    margin-bottom: 1.5rem;
    line-height: 1.3;
  }

  .blog-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e8e8e8;

    .blog-subtitle {
      font-size: 1.2rem;
      color: #666666;
      font-weight: 500;
    }

    .blog-divider {
      color: #666666;
      font-size: 1.2rem;
      font-weight: 300;
    }

    .blog-date {
      font-size: 1rem;
      color: #666666;
    }
  }

  .blog-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: @color-text-1;
    word-break: break-word;

    p {
      margin-bottom: 2rem;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin: 3rem 0;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }

    span {
      /* 保留span标签的样式 */
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }

  .spin-content {
    width: 100%;
  }
}

@media (max-width: 770px) {
  .blog-detail-container {
    padding: 6rem 0;
  }

  .app-color-text-main {
    padding: 0 1rem;

    .blog-breadcrumb {
      font-size: 0.875rem;

      .breadcrumb-separator {
        margin: 0 0.25rem;
      }
    }

    .blog-title {
      font-size: 2rem;
    }

    .blog-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;

      .blog-divider {
        display: none;
      }
    }

    .blog-content {
      .blog-paragraph {
        font-size: 1rem;
      }
    }
  }
}
</style>
