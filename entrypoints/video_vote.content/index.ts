import plugin from '@/assets/configs/plugin.json'
import sheet from '@/assets/configs/css.json'

export default defineContentScript({
    matches: plugin.config.optimize.vote_optimize.matches,
    excludeMatches: plugin.config.optimize.vote_optimize.exclude,
    registration: "manifest",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.optimize.vote_optimize.enable;
            if (enable) {
                console.log('视频内投票以优化');
                let css: string = '';
                let cssSheet: Array<string> = sheet.video_vote.css;
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