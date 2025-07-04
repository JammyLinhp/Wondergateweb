import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const timestamp = new Date().getTime();
export default defineConfig({
  base: '/',
  plugins: [vue()],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 3500,
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  ssr: {
    noExternal: ['pinia-plugin-persist', 'ant-design-vue', /@ant-design/, 'scroll-into-view-if-needed'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://172.20.0.14:8037',
        changeOrigin: true,
        // rewrite: (path) => {
        //   return path.replace(/^\/api/, '');
        // },
      },
    },
    port: 12017,
    host: '0.0.0.0', // 允许外部访问
    allowedHosts: ['wondergate.io', 'www.wondergate.io', 'localhost', '127.0.0.1'],
  },
});
