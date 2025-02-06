import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt', 
      injectRegister: 'auto', 
      devOptions: {
        enabled: false, 
      },
      manifest: {
        name: 'TechFix',
        short_name: 'TechFix',
        description: 'A repair management app',
        start_url: '/',
        display: 'standalone',
        background_color: '#0C3C61FF',
        theme_color: '#0C3C61FF',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      // registerType: 'autoUpdate',
    }),],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: '192.168.100.13', // ip add ng laptop mo
    },
  },
})
