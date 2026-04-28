export default [
    {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/blog/index.vue'),
        meta: {
            key: 'blog',
            code: 'blog',
            activeMenu: '/blog'
        },
    },
    {
        path: '/blog/detail/:slug',
        name: 'blog detail',
        component: () => import('@/views/blog/detail/index.vue'),
        meta: {
            key: 'blog.detail',
            code: 'blog.detail',
            activeMenu: '/blog/detail'
        }
    },
]