import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '@/layout/base/index.vue';
import { useLangStore } from '@/stores/lang';
import { storeToRefs } from 'pinia';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base layout',
      component: BaseLayout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/views/index.vue'),
          meta: {
            key: 'home',
            code: 'home',
            activeMenu: '/index',
            icon: 'icon-home',
            breadcrumb: [{ title: 'moozumi.menu.homePage' }],
          },
        },
      ],
    },
  ],
});

export const setupRouter = (app: any) => {
  let hasInitPermission = false;
  router.beforeEach(async (to, from, next) => {
    next();
  });
  return router;
};

export default router;
