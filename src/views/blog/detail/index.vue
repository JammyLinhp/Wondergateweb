<template>
  <div class="layout-background-2">
    <Header></Header>
    <div class="layout-background-2 app-header-distance"></div>
  </div>
  <div class="blog-detail-container">
    <div class="layout-content">
      <div class="app-color-text-main">
        <a-spin v-if="loading && !isSSRReady" tip="Loading..." class="loading-container">
          <div class="spin-content"></div>
        </a-spin>
        <div v-else>
          <!-- 面包屑 -->
          <nav class="blog-breadcrumb" aria-label="Breadcrumb">
            <ol style="list-style: none; padding: 0; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <li><a href="/">Home</a></li>
              <li class="breadcrumb-separator">/</li>
              <li><a @click="onButtonClick('/blog', ['moo.menu.blogBanner', 'moo.menu.blogBanner'])" style="cursor: pointer;">Blog</a></li>
              <li class="breadcrumb-separator">/</li>
              <li><span class="breadcrumb-current">{{ categoryName }}</span></li>
              <li class="breadcrumb-separator">/</li>
              <li><span class="breadcrumb-current" style="color: #999;">{{ blogDetail.title }}</span></li>
            </ol>
          </nav>

          <!-- 大标题 -->
          <h1 class="blog-title">{{ blogDetail.title }}</h1>

          <!-- 小标题及时间 -->
          <div class="blog-meta">
            <span class="blog-subtitle">{{ categoryName }}</span>
            <span class="blog-divider">|</span>
            <span class="blog-date">{{ blogDetail.publishedAt }}</span>
          </div>

          <!-- 正文 -->
          <article class="blog-content" v-html="cleanedContent"></article>

          <!-- Related Articles -->
          <div v-if="relatedPosts.length > 0" class="related-articles">
            <h2 class="related-title">Related Articles</h2>
            <div class="related-grid">
              <div
                v-for="related in relatedPosts"
                :key="related.slug"
                class="related-card"
                @click="goToArticle(related.slug)"
              >
                <div class="related-card-image" v-if="related.coverImage">
                  <img :src="related.coverImage" :alt="related.title" loading="lazy" />
                </div>
                <div class="related-card-content">
                  <h3 class="related-card-title">{{ related.title }}</h3>
                  <p class="related-card-desc">{{ truncateText(related.summary, 100) }}</p>
                  <span class="related-card-date">{{ related.publishedAt }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="blog-cta">
            <h3>Ready to streamline your cross-border payments?</h3>
            <p>Discover how Wondergate can help your business scale globally.</p>
            <a-button type="primary" size="large" @click="goToContact">Get Started Today</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import { ref, onMounted, inject, computed } from 'vue';
import { getPostDetail, getPostCategories, getPostList } from '@/utils/api';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const newsSlug = route.params.slug;
const SAVE_KEY: any = 'header_key';

// SSR data injection
const ssrData = inject<any>('ssrData', {});
const isSSR = inject('isSSR', false);

// Category tabs
const tabs: any = ref(ssrData.categories || []);

// Blog detail data — prefer SSR data
const blogDetail: any = ref(ssrData.post || {});
const isSSRReady = computed(() => !!ssrData.post);

const cleanedContent = computed(() => {
  const content = blogDetail.value?.content || '';
  if (!content) return '';
  return content.replace(/(?:<hr[^>]*>\s*)?<div[^>]*margin-top\s*:\s*2\.5rem[^>]*>[\s\S]*$/i, '');
});

const loading = ref(!ssrData.post);
const categoryName = ref(ssrData.categoryName || '');
const relatedPosts: any = ref([]);

// Route helpers
const onButtonClick = (path: any, listKeys: any) => {
  router.push({ path });
  window.localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({ currentKey: listKeys[1], openKeys: listKeys }),
  );
};
const goToArticle = (slug: string) => {
  window.open(`/blog/detail/${slug}`, '_self');
};
const goToContact = () => {
  router.push({ path: '/contact-us' });
};
const truncateText = (text: string, max: number) => {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
};

// Client-side fallback: fetch data if not provided by SSR
onMounted(async () => {
  try {
    // Categories
    if (!tabs.value.length) {
      await getPostCategories().then((res: any) => {
        tabs.value = res.map((item: any) => ({
          key: item.id.toString(),
          title: item.name,
        }));
      });
    }

    // Post detail
    if (!blogDetail.value.title) {
      await getPostDetail(newsSlug).then((res: any) => {
        blogDetail.value = res;
      });
    }

    // Category name
    if (!categoryName.value && blogDetail.value.categoryId) {
      const cat = tabs.value.find(
        (item: any) => item.key === blogDetail.value.categoryId?.toString()
      );
      categoryName.value = cat?.title || '';
    }

    // Related articles
    if (!relatedPosts.value.length && blogDetail.value.categoryId) {
      try {
        const catId = blogDetail.value.categoryId?.toString() || tabs.value[0]?.key;
        if (catId) {
          await getPostList(catId).then((res: any) => {
            relatedPosts.value = res
              .filter((item: any) => item.slug !== newsSlug)
              .slice(0, 3)
              .map((item: any) => ({
                slug: item.slug,
                title: item.title,
                summary: item.summary,
                coverImage: item.coverImage,
                publishedAt: item.publishedAt,
              }));
          });
        }
      } catch (e) { /* silent */ }
    }
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
      color: @color-bg;

      &:hover {
        text-decoration: underline;
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
    color: #666666;

    .blog-subtitle { font-size: 1.2rem; font-weight: 500; }
    .blog-divider { font-size: 1.2rem; font-weight: 300; }
    .blog-date { font-size: 1rem; }
  }

  .blog-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: @color-text-1;
    word-break: break-word;

    p { margin-bottom: 2rem; }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin: 3rem 0;
      transition: transform 0.3s ease;
      &:hover { transform: scale(1.02); }
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }
  .spin-content { width: 100%; }
}

// Related Articles
.related-articles {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e8e8e8;

  .related-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: @color-text-1;
    margin-bottom: 1.5rem;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .related-card {
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .related-card-image {
      img {
        width: 100%;
        height: 160px;
        object-fit: cover;
      }
    }

    .related-card-content {
      padding: 1rem;

      .related-card-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: @color-text-1;
        margin: 0 0 0.5rem;
        line-height: 1.4;
      }

      .related-card-desc {
        font-size: 0.9rem;
        color: #666;
        margin: 0 0 0.5rem;
        line-height: 1.5;
      }

      .related-card-date {
        font-size: 0.8rem;
        color: #999;
      }
    }
  }
}

// CTA
.blog-cta {
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #022233 0%, #033a55 100%);
  border-radius: 12px;
  text-align: center;
  color: #fff;

  h3 {
    font-size: 1.5rem;
    margin: 0 0 0.75rem;
    color: #fff;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 770px) {
  .blog-detail-container { padding: 6rem 0; }
  .app-color-text-main {
    padding: 0 1rem;
    .blog-title { font-size: 2rem; }
    .blog-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      .blog-divider { display: none; }
    }
  }
  .related-articles .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
