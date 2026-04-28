
export default [
    {
        path: '/about-us',
        name: 'about us',
        component: () => import('@/views/about-us/index.vue'),
        meta: {
            key: 'about',
            code: 'about',
            activeMenu: '/about-us'
        },
    },
]