import { createRouter, createWebHistory } from 'vue-router';
import BaseLayout from '@/layout/base/index.vue';
import Product from '@/router/config/product';


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
          },
        },
        ...Product,
        {
          path: '/security-center',
          name: 'security center',
          component: () => import('@/views/security/index.vue'),
          meta: {
            key: 'security',
            code: 'security',
            activeMenu: '/security-center',
          },
        },
        {
          path: '/about-us',
          name: 'about us',
          component: () => import('@/views/about-us/index.vue'),
          meta: {
            key: 'about',
            code: 'about',
            activeMenu: '/about-us',
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
