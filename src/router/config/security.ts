
export default [
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
        path: '/security-center/terms-and-policies/agreement',
        name: 'terms and policies',
        component: () => import('@/views/security/terms/agreement/index.vue'),
        meata: {
            key: 'security.terms',
            code: 'security.terms',
            activeMenu: '/security-center/terms-and-policies'
        }
    },
]