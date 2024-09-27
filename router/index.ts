import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/advertisment' },
        { path: '/advertisment', component: () => import('@/components/popup/DeAdvertisement.vue') },
        { path: '/download', component: () => import('@/components/popup/Download.vue') },
        { path: '/optimize', component: () => import('@/components/popup/Optimize.vue') },
        { path: '/video', component: () => import('@/components/popup/Video.vue') },
        { path: '/about', component: () => import('@/components/popup/About.vue') },
    ]
});
export default router;