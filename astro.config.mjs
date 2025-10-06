// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tecnomata.com',
  // Sitio 100% estático (ideal para hosting simple + Web3Forms)
  integrations: [
    tailwind(), 
    sitemap({
      customPages: [
        'https://tecnomata.com/marketing-internet-morelos',
        'https://tecnomata.com/disenador-web-morelos', 
        'https://tecnomata.com/agencia-publicidad-morelos',
        'https://tecnomata.com/asesor-marketing-morelos',
      ],
      changefreq: 'monthly',
      priority: 0.9,
      lastmod: new Date(),
    })
  ],
});