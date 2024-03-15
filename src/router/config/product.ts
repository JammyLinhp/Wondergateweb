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
];
