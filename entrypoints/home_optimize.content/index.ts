import plugin from '@/assets/configs/plugin.json'
import sheet from '@/assets/configs/css.json'

export default defineContentScript({
    matches: plugin.config.optimize.home_optimize.matches,
    excludeMatches: plugin.config.optimize.home_optimize.exclude,
    registration: "manifest",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.optimize.home_optimize.enable;
            if (enable) {
                console.log('已去除主站其他分区视频推荐卡片');
                let css: string = '';
                let cssSheet: Array<string> = sheet.home_optimize.css;
                for (var i = 0; i < cssSheet.length; i++) {
                    css = css + cssSheet[i];
                };
                let style: HTMLStyleElement = document.createElement('style');
                style.appendChild(document.createTextNode(css));
                document.head.appendChild(style);
            }
        })
    }
})