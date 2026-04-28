<template>
  <div class="layout-background-2">
    <Header></Header>
    <div class="layout-content product-settlement-wrap">
      <Carousel />
    </div>
  </div>
  <div class="news-section">
    <div class="news-tabs">
      <a-tabs v-model:activeKey="activeTab" @change="handleTabChange" size="large">
        <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
          <div class="news-list">
            <div v-if="loading" class="loading-container">
              <a-spin tip="Loading..." />
            </div>
            <div v-else-if="newsList.length === 0" class="empty-container">
              <a-empty :image="false" style="margin-top: -5rem" description="GET READY" />
              <rocket-filled style="font-size: 2rem" />
            </div>
            <div class="news-item" v-for="news in newsList" :key="news.id" @click="handleDetail(news.slug)">
              <div class="news-image">
                <img :src="news.image" :alt="news.title" />
              </div>
              <div class="news-content">
                <h3 class="news-item-title">{{ news.title }}</h3>
                <p class="news-item-desc">{{ news.description }}</p>
                <div class="news-item-footer">
                  <span class="news-date">{{ news.date }}</span>
                  <a-button type="link" size="small" @click.stop="handleDetail(news.slug)">
                    {{ $t('moo.about.detail') }}
                  </a-button>
                </div>
              </div>
            </div>
            <!-- 分页组件 -->
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
import { ref, onMounted, getCurrentInstance } from 'vue';
import { getPostList, getPostCategories } from '@/utils/api';
import { message } from 'ant-design-vue';
const { proxy } = getCurrentInstance() as any;

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
}

interface Tab {
  key: string;
  title: string;
}

const emit = defineEmits<{
  (e: 'tabChange', key: string): void;
  (e: 'detail', slug: string): void;
  (e: 'seeMore'): void;
}>();

// 标签页数据
const tabs = ref<Tab[]>([]);
const activeTab = ref('');
const loading = ref(false);
const newsList = ref<NewsItem[]>([]);

// 分页相关
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);

// 原始新闻数据
const originalNewsList = ref<NewsItem[]>([]);

// 获取新闻数据
const fetchNewsData = async (tabKey: string) => {
  loading.value = true;
  newsList.value = [];
  currentPage.value = 1;
  try {
    await getPostList(tabKey).then((res: any) => {
      originalNewsList.value = res.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.summary,
        image: item.coverImage,
        date: item.publishedAt,
        slug: item.slug,
      }));
      total.value = originalNewsList.value.length;
      // 计算当前页的数据
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

// 更新当前页数据
const updateCurrentPageData = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  newsList.value = originalNewsList.value.slice(start, end);
};

// 处理分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
  updateCurrentPageData();
};

// 处理标签页切换
const handleTabChange = (key: string) => {
  activeTab.value = key;
  fetchNewsData(key);
};

// 处理详情点击
const handleDetail = (slug: string) => {
  emit('detail', slug);
  // 在新窗口打开详情页面
  window.open(`/blog/detail/${slug}`, '_blank');
};

// 初始加载数据
onMounted(async () => {
  try {
    await getPostCategories().then((res: any) => {
      tabs.value = res.map((item: any) => ({
        key: item.id.toString(),
        title: item.name,
      }));
    });
    // 设置默认激活的标签页
    if (tabs.value.length > 0) {
      activeTab.value = tabs.value[0].key;
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

  .news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    .news-title {
      font-size: 2rem;
      font-weight: 600;
      color: @color-text-1;
      margin: 0;
    }

    .see-more-btn {
      color: @color-bg;
      font-size: 1rem;

      &:hover {
        color: darken(@color-bg, 10%);
      }
    }
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

            &:hover {
              transform: scale(1.05);
            }
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

            &:hover {
              color: @color-bg;
            }
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

    .product-settlement-description {
      padding: 3rem 0;
    }
  }
}
@media (max-width: 770px) {
  .news-section {
    padding: 0 1rem;

    .news-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;

      .news-title {
        font-size: 1.5rem;
      }
    }

    .news-tabs {
      .news-list {
        .news-item {
          flex-direction: column;

          .news-image {
            flex: 0 0 auto;
            margin-right: 0;
            margin-bottom: 1rem;
            width: 100%;

            img {
              height: 200px;
            }
          }

          .news-content {
            .news-item-title {
              font-size: 1.125rem;
            }
          }
        }
      }
    }
  }
}
</style>
