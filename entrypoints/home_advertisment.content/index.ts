import plugin from '@/assets/configs/plugin.json'

export default defineContentScript({
    matches: plugin.config.advertisement.de_home_advertisement.matches,
    excludeMatches: plugin.config.advertisement.de_home_advertisement.exclude,
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