import { createRouter, createMemoryHistory, Router, createWebHistory } from 'vue-router';
import BaseLayout from '@/layout/base/index.vue';
import Product from '@/router/config/product';
import Policy from '@/router/config/policy';

export const createMyRouter = (type: 'client' | 'server'): Router =>
  createRouter({
    history: type === 'client' ? createWebHistory(import.meta.env.BASE_URL) : createMemoryHistory(import.meta.env.BASE_URL),
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
          {
            path: '/contact-us',
            name: 'contact us',
            component: () => import('@/views/contact-us/index.vue'),
            meta: {
              key: 'contact',
              code: 'contact',
              activeMenu: '/contact-us',
            },
          },
          ...Product,
          ...Policy,
        ],
      },
    ],
  });


// export const setupRouter = (app: any) => {
//   router.beforeEach(async (to, from, next) => {
//     next();
//   });
//   return router;
// };
//
// export default router;
