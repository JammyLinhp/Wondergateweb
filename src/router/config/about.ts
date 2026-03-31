
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
    {
        path: '/about-us/blog-banner',
        name: 'blog banner',
        component: () => import('@/views/about-us/blog-banner/index.vue'),
        meta: {
            key: 'about.blogBanner',
            code: 'about.blogBanner',
            activeMenu: '/about-us/blog-banner'
        }
    },
    {
        path: '/about-us/blog-banner/detail/:id',
        name: 'blog banner detail',
        component: () => import('@/views/about-us/blog-banner/detail/index.vue'),
        meta: {
            key: 'about.blogBannerDetail',
            code: 'about.blogBannerDetail',
            activeMenu: '/about-us/blog-banner/detail'
        }
    },
]