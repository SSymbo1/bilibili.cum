import plugin from '@/assets/configs/plugin.json'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      storage.getMeta('local:config').then((config) => {
        console.log(config);
        if (config === null || Object.keys(config).length === 0) {
          storage.setMeta('local:config', plugin.config);
          console.log('不存在配置项,已初始化配置项');
        } else {
          console.log('存在配置项,继续');
        }
      })
    }
  })
});
