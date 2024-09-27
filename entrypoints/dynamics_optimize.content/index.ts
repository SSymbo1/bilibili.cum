import plugin from '@/assets/configs/plugin.json'
import sheet from '@/assets/configs/css.json'

export default defineContentScript({
    matches: plugin.config.optimize.dynamics_optimize.matches,
    excludeMatches: plugin.config.optimize.dynamics_optimize.exclude,
    registration: "manifest",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.optimize.dynamics_optimize.enable;
            if (enable) {
                console.log("已优化动态界面!");
                let css: string = '';
                let cssSheet: Array<string> = sheet.dynamics_optimize.css;
                for (var i = 0; i < cssSheet.length; i++) {
                    css = css + cssSheet[i];
                };
                let style: HTMLStyleElement = document.createElement('style');
                style.appendChild(document.createTextNode(css));
                document.head.appendChild(style);
            };
        });
    }
})