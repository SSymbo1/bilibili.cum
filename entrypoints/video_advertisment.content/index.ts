export default defineContentScript({
    matches: ['*://*.bilibili.com/video/*'],
    registration: "manifest",
    main: async (ctx) => {
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.advertisement.de_video_advertisement.enable;
            if (enable) {
                console.log('主站视频界面广告屏蔽已启用');
            } else {
                console.log('主站视频界面广告屏蔽未启用');
            }
        })
    }
})