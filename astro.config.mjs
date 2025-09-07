// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Sitio 100% estático (ideal para hosting simple + Web3Forms)
  integrations: [tailwind()],
});