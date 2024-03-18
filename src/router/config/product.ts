export default [
  {
    path: '/product-center/global-payments',
    name: 'product center',
    component: () => import('@/views/product/global/index.vue'),
    meta: {
      key: 'product.global',
      code: 'product.global',
      activeMenu: '/product-center/global-payments',
    },
  },
  {
    path: '/product-center/global-collection-account',
    name: 'global collection account',
    component: () => import('@/views/product/account/index.vue'),
    meta: {
      key: 'product.account',
      code: 'product.account',
      activeMenu: '/product-center/global-collection-account',
    },
  },
  {
    path: '/product-center/payment-solutions',
    name: 'global solutions',
    component: () => import('@/views/product/solutions/index.vue'),
    meta: {
      key: 'product.solutions',
      code: 'product.solutions',
      activeMenu: '/product-center/payment-solutions',
    },
  },
  {
    path: '/product-center/issuing-virtual-cards',
    name: 'issuing virtual cards',
    component: () => import('@/views/product/cards/index.vue'),
    meta: {
      key: 'product.cards',
      code: 'product.cards',
      activeMenu: '/product-center/issuing-virtual-cards',
    },
  },
];
