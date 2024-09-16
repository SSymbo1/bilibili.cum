import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/advertisment' },
        { path: '/advertisment', component: () => import('@/components/DeAdvertisement.vue') },
        { path: '/download', component: () => import('@/components/Download.vue') },
        { path: '/optimize', component: () => import('@/components/Optimize.vue') },
        { path: '/about', component: () => import('@/components/About.vue') },
    ]
})
export default router;