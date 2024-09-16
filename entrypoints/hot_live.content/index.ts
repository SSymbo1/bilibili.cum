import plugin from '@/assets/configs/plugin.json'

export default defineContentScript({
    matches: plugin.config.optimize.hot_live_optimize.matches,
    excludeMatches: plugin.config.optimize.hot_live_optimize.exclude,
    registration: "manifest",
    main: async (ctx) => {
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.optimize.hot_live_optimize.enable;
            if (enable) {
                console.log('大家围观的直播以被优化');
            } else {
                console.log('启用大家围观的直播');
            }
        })
    }
})