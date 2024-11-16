import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 確保 @ 指向 src 資料夾
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://testapi.tyche1.com/", // PHP API 基本 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
