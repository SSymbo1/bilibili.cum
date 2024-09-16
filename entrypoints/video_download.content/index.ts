import plugin from '@/assets/configs/plugin.json'

export default defineContentScript({
    matches: plugin.config.download.download_video.matches,
    excludeMatches:plugin.config.download.download_video.exclude,
    registration: "manifest",
    main: async (ctx) => {
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.download.download_video.enable;
            if (enable) {
                console.log('视频下载功能已启用');
            } else {
                console.log('视频下载功能已禁用');
            }
        })
    }
})