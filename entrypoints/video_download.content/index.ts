import plugin from '@/assets/configs/plugin.json'
import Download from '@/components/content/Download.vue'

export default defineContentScript({
    matches: plugin.config.download.download_video.matches,
    excludeMatches: plugin.config.download.download_video.exclude,
    registration: "manifest",
    cssInjectionMode: 'ui',
    async main(ctx) {
        console.log(ctx);
        storage.getMeta('local:config').then(async (config: any) => {
            const cover_download_enable: boolean = config.download.cover_video.enable;
            const video_download_enable: boolean = config.download.download_video.enable;
            if (cover_download_enable || video_download_enable) {
                console.log('下载功能已启用');
                setTimeout(async () => {
                    await renderingUI(ctx);
                }, 5000);
            };
        });
    }
});

const renderingUI = async (ctx: any) => {
    const ui = await createShadowRootUi(ctx, {
        name: 'video-download-ui',
        position: 'overlay',
        anchor: '.video-toolbar-left-main',
        onMount: (container) => {
            const app = createApp(Download);
            app.mount(container);
            const isolatedArea: HTMLElement | null = document.querySelector('video-download-ui');
            if (isolatedArea) {
                isolatedArea.style.zIndex = '1';
                isolatedArea.style.width = '46px';
                isolatedArea.style.height = '46px';
            };
            return app;
        },
        onRemove: (app) => {
            app?.unmount();
        }
    });
    ui.mount();
};
