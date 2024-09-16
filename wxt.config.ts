import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifestVersion: 3,
  manifest: {
    permissions: ['storage'],
    icons: {
      "16": "/icon/title.png",
      "48": "/icon/title.png",
      "128": "/icon/title.png"
    }
  }
});
