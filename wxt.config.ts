import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifestVersion: 3,
  manifest: {
    permissions: ['storage'],
  }
});
