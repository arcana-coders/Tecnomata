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
});