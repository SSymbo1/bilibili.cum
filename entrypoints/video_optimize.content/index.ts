import plugin from '@/assets/configs/plugin.json'
import sheet from '@/assets/configs/css.json'

export default defineContentScript({
    matches: plugin.config.optimize.video_optimize.matches,
    excludeMatches: plugin.config.optimize.video_optimize.exclude,
    registration: "manifest",
    runAt: "document_end",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.optimize.video_optimize.enable;
            if (enable) {
                // // 当前功能存在问题：注入脚本修改dom结构时马会杯bilimirror拦截
                // // todo 注入拦截问题
                // const onDocumentReady = (callback: () => void) => {
                //     if (document.readyState === 'complete') {
                //         callback();
                //     } else {
                //         setTimeout(() => onDocumentReady(callback), 100);
                //     };
                // };
                // onDocumentReady(() => {
                //     const commentNode = document.querySelector('bili-comments');
                //     console.log(commentNode);
                //     // todo 去除#shadow-root中head标记的div里的notice
                // });
                console.log("视频播放界面已优化!");
                let css: string = '';
                let cssSheet: Array<string> = sheet.video_optimize.css;
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