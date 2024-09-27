import { fileURLToPath } from 'node:url'
import { defineConfig } from 'wxt'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver()
        ],
        dts: fileURLToPath(new URL('./types/auto-import.d.ts', import.meta.url))
      }),
      Components({
        resolvers: [
          ElementPlusResolver()
        ],
        dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url))
      }),
    ]
  }),
  modules: ['@wxt-dev/module-vue'],
  manifestVersion: 3,
  manifest: {
    permissions: ['storage','tabs'],
  },
});