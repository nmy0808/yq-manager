import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    extensions:['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': '/src'
    }
  },
  css:{
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import '@/assets/scss/mixin.scss';
          @import '@/assets/scss/variable.scss';`
        }
      }
  },
  plugins: [vue()],
});
