import plugin from '@/assets/configs/plugin.json'
import sheet from '@/assets/configs/css.json'

export default defineContentScript({
    matches: plugin.config.advertisement.de_home_advertisement.matches,
    excludeMatches: plugin.config.advertisement.de_home_advertisement.exclude,
    registration: "manifest",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.advertisement.de_home_advertisement.enable;
            if (enable) {
                console.log('主站首页广告屏蔽已启用');
                let css: string = '';
                let cssSheet: Array<string> = sheet.home_advertisment.css;
                for (var i = 0; i < cssSheet.length; i++) {
                    css = css + cssSheet[i];
                };
                let style: HTMLStyleElement = document.createElement('style');
                style.appendChild(document.createTextNode(css));
                document.head.appendChild(style);
                const observer = new MutationObserver((mutations) => {
                    for (const mutation of mutations) {
                        if (mutation.type === 'childList') {
                            const rcmdCard = document.querySelectorAll('div.bili-video-card.is-rcmd:not(.enable-no-interest)');
                            rcmdCard.forEach((card) => {
                                if ((card.parentNode as Element).className === 'feed-card') {
                                    (card.parentNode as Element).remove();
                                };
                                card.remove();
                            });
                        };
                    };
                });
                const cardContainer = document.querySelectorAll('.container.is-version8')[0];
                observer.observe(cardContainer, { childList: true, subtree: true });
            };
        });
    }
});