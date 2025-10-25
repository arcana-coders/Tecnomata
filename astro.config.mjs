// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import critters from 'astro-critters';
// import sitemap from '@astrojs/sitemap'; // Desactivado - usando sitemap manual

// https://astro.build/config
export default defineConfig({
  site: 'https://tecnomata.com',
  // Sitio 100% estático (ideal para hosting simple + Web3Forms)
  integrations: [
    tailwind(),
    // Inline Critical CSS y carga diferida del resto
    critters({
      preload: 'media', // usa media=print/onload swap para no bloquear
      pruneSource: true,
      reduceInlineStyles: true,
      mergeStylesheets: true
    })
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