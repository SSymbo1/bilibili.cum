export default defineContentScript({
    matches: ['*://*.bilibili.com/*'],
    registration: "manifest",
    main: async (ctx) => {
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.advertisement.de_home_advertisement.enable;
            if (enable) {
                console.log('主站首页广告屏蔽已启用');
            } else {
                console.log('主站广告屏蔽未启用');
            }
        })
    }
})