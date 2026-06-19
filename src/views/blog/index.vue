<template>
  <div class="layout-background-2">
    <Header></Header>
    <div class="layout-content product-settlement-wrap">
      <Carousel />
    </div>
  </div>
  <div class="news-section">
    <h1 class="app-title-text-small app-text-font layout-content">{{ $t('moo.menu.blogBanner') }}</h1>
    <div class="news-tabs">
      <a-tabs v-model:activeKey="activeTab" @change="handleTabChange" size="large">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
          <div class="news-list">
            <div v-if="loading && !isSSRReady" class="loading-container">
              <a-spin tip="Loading..." />
            </div>
            <div v-else-if="newsList.length === 0" class="empty-container">
              <a-empty :image="false" style="margin-top: -5rem" description="GET READY" />
              <rocket-filled style="font-size: 2rem" />
            </div>
            <div class="news-item" v-for="news in newsList" :key="news.id" @click="handleDetail(news.slug)">
              <div class="news-image">
                <img :src="news.coverImage || news.image" :alt="news.title" loading="lazy" />
              </div>
              <div class="news-content">
                <h3 class="news-item-title">{{ news.title }}</h3>
                <p class="news-item-desc">{{ news.summary || news.description }}</p>
                <div class="news-item-footer">
                  <span class="news-date">{{ news.publishedAt || news.date }}</span>
                  <a-button type="link" size="small" @click.stop="handleDetail(news.slug)">
                    {{ $t('moo.about.detail') }}
                  </a-button>
                </div>
              </div>
            </div>
            <!-- Pagination -->
            <div v-if="total > pageSize" class="pagination-container">
              <a-pagination
                v-model:current="currentPage"
                :page-size="pageSize"
                :total="total"
                @change="handlePageChange"
                :show-size-changer="false"
                :show-quick-jumper="true"
                style="margin-top: 2rem; text-align: center"
              />
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';
import Footer from '@/components/footer/index.vue';
import Carousel from '@/components/carousel/index.vue';
import { ref, onMounted, inject, computed, getCurrentInstance } from 'vue';
import { getPostList, getPostCategories } from '@/utils/api';
import { message } from 'ant-design-vue';
const { proxy } = getCurrentInstance() as any;

// SSR data
const ssrData = inject<any>('ssrData', {});
const isSSRReady = computed(() => !!(ssrData.categories?.length && ssrData.posts?.length));

const emit = defineEmits<{
  (e: 'tabChange', key: string): void;
  (e: 'detail', slug: string): void;
  (e: 'seeMore'): void;
}>();

// Init from SSR data
const tabs = ref<any[]>(
  ssrData.categories?.map((item: any) => ({
    key: item.id?.toString(),
    title: item.name,
  })) || []
);
const activeTab = ref(ssrData.activeCategoryId || '');
const loading = ref(!ssrData.categories?.length);
const newsList = ref<any[]>([]);

// Pagination
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const originalNewsList = ref<any[]>([]);

// Init from SSR data if available
if (ssrData.posts?.length) {
  originalNewsList.value = ssrData.posts.map((item: any) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    coverImage: item.coverImage,
    publishedAt: item.publishedAt,
    slug: item.slug,
  }));
  total.value = originalNewsList.value.length;
  updateCurrentPageData();
  loading.value = false;
}

// Fetch news data
const fetchNewsData = async (tabKey: string) => {
  loading.value = true;
  newsList.value = [];
  currentPage.value = 1;
  try {
    await getPostList(tabKey).then((res: any) => {
      originalNewsList.value = res.map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        coverImage: item.coverImage,
        publishedAt: item.publishedAt,
        slug: item.slug,
      }));
      total.value = originalNewsList.value.length;
      updateCurrentPageData();
      emit('tabChange', tabKey);
    });
  } catch (error) {
    message.error(proxy.$t('moo.about.failedToFetchNewsData'));
    originalNewsList.value = [];
    total.value = 0;
    newsList.value = [];
  } finally {
    loading.value = false;
  }
};

function updateCurrentPageData() {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  newsList.value = originalNewsList.value.slice(start, end);
}

const handlePageChange = (page: number) => {
  currentPage.value = page;
  updateCurrentPageData();
};

const handleTabChange = (key: string) => {
  activeTab.value = key;
  fetchNewsData(key);
};

const handleDetail = (slug: string) => {
  emit('detail', slug);
  window.open(`/blog/detail/${slug}`, '_blank');
};

onMounted(async () => {
  try {
    if (!tabs.value.length) {
      await getPostCategories().then((res: any) => {
        tabs.value = res.map((item: any) => ({
          key: item.id?.toString(),
          title: item.name,
        }));
      });
    }
    if (tabs.value.length > 0 && !activeTab.value) {
      activeTab.value = tabs.value[0].key;
    }
    if (!originalNewsList.value.length && activeTab.value) {
      await fetchNewsData(activeTab.value);
    }
  } catch (error) {
    message.error(proxy.$t('moo.about.failedToFetchCategories'));
  }
});
</script>

<style lang="less" scoped>
@import '@/styles/base.less';

.product-settlement-wrap {
  padding-top: 3.5rem;
  padding-bottom: 2.5rem;

  .product-settlement-description {
    padding: 2rem 0;
  }
}
.news-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  :deep(.ant-tabs-tab) {
    font-size: 1.2rem;
    margin-right: 1rem;
    font-weight: 600 !important;
  }

  .news-tabs {
    .news-list {
      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4rem 0;
      }

      .empty-container {
        padding: 4rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .news-item {
        display: flex;
        padding: 1rem 1rem;
        border-bottom: 1px solid #cdcdcd;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: #f7f7f7;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .news-image {
          flex: 0 0 200px;
          margin-right: 1.5rem;
          border-radius: 8px;
          overflow: hidden;

          img {
            width: 100%;
            height: 160px;
            object-fit: cover;
            transition: transform 0.3s ease;
            &:hover { transform: scale(1.05); }
          }
        }

        .news-content {
          flex: 1;

          .news-item-title {
            font-size: 1.15rem;
            font-weight: 600;
            color: @color-text-1;
            margin: 0 0 0.75rem;
            transition: color 0.3s ease;
            &:hover { color: @color-bg; }
          }

          .news-item-desc {
            font-size: 1rem;
            color: @color-text-2;
            line-height: 1.6;
            margin: 0 0 1rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .news-item-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .news-date {
              font-size: 0.875rem;
              color: #666666;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1270px) {
  .product-settlement-wrap {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}
@media (max-width: 770px) {
  .news-section {
    padding: 0 1rem;
    .news-tabs .news-list .news-item {
      flex-direction: column;
      .news-image {
        flex: 0 0 auto;
        margin-right: 0;
        margin-bottom: 1rem;
        width: 100%;
        img { height: 200px; }
      }
    }
  }
}
</style>
