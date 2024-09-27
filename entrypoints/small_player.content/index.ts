import plugin from '@/assets/configs/plugin.json'

export default defineContentScript({
    matches: plugin.config.video.small_player_window.matches,
    excludeMatches: plugin.config.video.small_player_window.exclude,
    registration: "manifest",
    main: async (ctx) => {
        console.log(ctx);
        storage.getMeta('local:config').then((config: any) => {
            let enable: boolean = config.video.small_player_window.enable;
            if (enable) {
                console.log("已关闭小窗口播放器!");
                const observer = new MutationObserver((mutations) => {
                    for (const mutation of mutations) {
                        if (mutation.type === 'childList' || mutation.type === 'attributes') {
                            const targetElements = document.querySelectorAll('.mini-player-window.fixed-sidenav-storage-item.on') as NodeListOf<HTMLElement>;
                            if (targetElements.length > 0) {
                                targetElements[0].click();
                            };
                        };
                    };
                });
                const watchNode = document.getElementsByClassName('fixed-sidenav-storage')[0] as Element;
                observer.observe(watchNode, { childList: true, subtree: true, attributeFilter: ['class'] })
            };
        });
    }
})