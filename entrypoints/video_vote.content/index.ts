import plugin from '@/assets/configs/plugin.json'

export default defineContentScript({
    matches: plugin.config.optimize.vote_optimize.matches,
    excludeMatches: plugin.config.optimize.vote_optimize.exclude,
    registration: "manifest",
    main: async (ctx) => {
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.optimize.vote_optimize.enable;
            if (enable) {
                console.log('视频内投票以优化');
            } else {
                console.log('启用视频内投票');
            }
        })
    }
})