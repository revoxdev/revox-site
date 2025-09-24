// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tinaDirective from "./astro-tina-directive/register"

import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://news.oapf.org', // Hardcoded, no env variable
    outDir: './dist',
    integrations: [mdx(), sitemap(), react(), tinaDirective(), icon({
      sets: ['tabler'], // Ensure "tabler" is included
    })],
    redirects: {
        '/admin': '/admin/index.html'
      },
    output: 'static',
    adapter: vercel({
      webAnalytics: {
        enabled: true,
      },
      maxDuration: 8,
    }),
});