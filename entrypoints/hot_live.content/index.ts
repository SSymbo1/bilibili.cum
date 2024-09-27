import plugin from '@/assets/configs/plugin.json'
import sheet from '@/assets/configs/css.json'

export default defineContentScript({
    matches: plugin.config.optimize.hot_live_optimize.matches,
    excludeMatches: plugin.config.optimize.hot_live_optimize.exclude,
    registration: "manifest",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.optimize.hot_live_optimize.enable;
            if (enable) {
                console.log('大家围观的直播以被优化');
                let css: string = '';
                let cssSheet: Array<string> = sheet.hot_live.css;
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