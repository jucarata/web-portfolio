import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://jucarata.github.io',
  // Solo usar base path en producción (GitHub Pages), no en desarrollo
  base: import.meta.env.DEV ? undefined : '/web-portfolio',
});
