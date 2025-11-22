import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist-widget',
    lib: {
      entry: fileURLToPath(new URL('./src/widget/index.ts', import.meta.url)),
      name: 'UsersWidget',
      fileName: 'users-widget',
      formats: ['umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        assetFileNames: 'users-widget.[ext]'
      }
    }
  }
})

