import http from '@/utils/http';

// 获取滚动条广告列表
export function getBannerList() {
  return http.get('/client/banner/list');
}
//   提交反馈
export function submitFeedback(data: any) {
  return http.post('/client/feedback/submit', data);
}

// 获取区号
export function getPhoneAreaCode() {
  return http.get('/common/list/phoneAreaCode');
}

// 获取博客分类列表
export function getPostCategories() {
  return http.get('/client/posts/getCategories');
}

// 获取博客分类下的文章列表
export function getPostList(categoryId: any) {
  return http.get(`/client/posts/list?categoryId=${categoryId}`);
}

// 获取博客文章详情
export function getPostDetail(slug: any) {
  return http.get(`/client/posts/show?slug=${slug}`);
}
