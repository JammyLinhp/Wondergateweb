import { createMemoryHistory, createRouter as _createRouter, createWebHistory, Router } from 'vue-router';
import BaseLayout from '@/layout/base/index.vue';
import Product from '@/router/config/product';
import Policy from '@/router/config/policy';
import Security from './config/security';

export const createRouter = (): Router =>
  _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'base layout',
        component: BaseLayout,
        redirect: '/home',
        children: [
          {
            path: '/home',
            name: 'home',
            component: () => import('@/views/index.vue'),
            meta: {
              key: 'home',
              code: 'home',
              activeMenu: '/home'
            }
          },
          {
            path: '/security-center',
            name: 'security center',
            component: () => import('@/views/security/index.vue'),
            meta: {
              key: 'security',
              code: 'security',
              activeMenu: '/security-center'
            },
          },
          {
            path: '/about-us',
            name: 'about us',
            component: () => import('@/views/about-us/index.vue'),
            meta: {
              key: 'about',
              code: 'about',
              activeMenu: '/about-us'
            }
          },
          {
            path: '/contact-us',
            name: 'contact us',
            component: () => import('@/views/contact-us/index.vue'),
            meta: {
              key: 'contact',
              code: 'contact',
              activeMenu: '/contact-us'
            }
          },
          ...Product,
          ...Policy,
          ...Security
        ]
      }
    ]
  });

// export const setupRouter = (app: any) => {
//   router.beforeEach(async (to, from, next) => {
//     next();
//   });
//   return router;
// };
//
// export default router;
