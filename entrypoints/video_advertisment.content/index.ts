import plugin from '@/assets/configs/plugin.json'
import sheet from '@/assets/configs/css.json'

export default defineContentScript({
    matches: plugin.config.advertisement.de_video_advertisement.matches,
    excludeMatches: plugin.config.advertisement.de_video_advertisement.exclude,
    registration: "manifest",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.advertisement.de_video_advertisement.enable;
            if (enable) {
                console.log('视频播放界面广告屏蔽已启动!');
                let css: string = '';
                let cssSheet: Array<string> = sheet.video_advertisment.css;
                for (var i = 0; i < cssSheet.length; i++) {
                    css = css + cssSheet[i];
                };
                let style: HTMLStyleElement = document.createElement('style');
                style.appendChild(document.createTextNode(css));
                document.head.appendChild(style);
            };
        });
    }
});