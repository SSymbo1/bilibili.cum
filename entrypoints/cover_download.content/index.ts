export default defineContentScript({
    matches: ['*://*.bilibili.com/video/*'],
    registration: "manifest",
    main: async (ctx) => {
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.download.cover_video.enable;
            if (enable) {
                console.log('视频封面下载功能已启用');
            } else {
                console.log('视频封面下载功能已禁用');
            }
        })
    }
})