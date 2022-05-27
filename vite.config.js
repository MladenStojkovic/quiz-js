import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
    strictPort: true,
    // 接口代理
    proxy: {
      '/api': {
        // development proxy
        target: 'http://localhost:5000/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
})
