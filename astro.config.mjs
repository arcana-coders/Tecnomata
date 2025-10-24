// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap'; // Desactivado - usando sitemap manual

// https://astro.build/config
export default defineConfig({
  site: 'https://tecnomata.com',
  // Sitio 100% estático (ideal para hosting simple + Web3Forms)
  integrations: [
    tailwind()
    // sitemap desactivado - usamos sitemap.xml manual en /public
  ],
  
  // Optimizaciones de build para mejor performance
  build: {
    inlineStylesheets: 'auto', // Inline CSS pequeños automáticamente
  },
  
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS por ruta para cargas más rápidas
      rollupOptions: {
        output: {
          manualChunks: undefined, // Permite mejor tree-shaking
        }
      }
    }
  }
});