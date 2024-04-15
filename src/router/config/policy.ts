export default [
  {
    path: '/policy/cookies',
    name: 'policy center',
    component: () => import('@/views/policy/cookies/index.vue'),
    meta: {
      key: 'policy.cookies',
      code: 'policy.cookies',
      activeMenu: '/policy/cookies',
    },
  },
  {
    path: '/policy/disclaimer',
    name: 'policy disclaimer',
    component: () => import('@/views/policy/disclaimer/index.vue'),
    meta: {
      key: 'policy.disclaimer',
      code: 'policy.disclaimer',
      activeMenu: '/policy/disclaimer',
    },
  },
  {
    path: '/policy/privacy',
    name: 'policy privacy',
    component: () => import('@/views/policy/privacy/index.vue'),
    meta: {
      key: 'policy.solutions',
      code: 'policy.solutions',
      activeMenu: '/policy/privacy',
    },
  },
];
