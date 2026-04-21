// astro.config.mjs
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { imageService } from "@unpic/astro/service";
import path from "path";
import pagefind from "astro-pagefind";

const stylesDir = path.join(process.cwd(), "src/styles");

// https://astro.build/config
export default defineConfig({
  output: 'static',

  image: {
    service: imageService({
      placeholder: "blurhash",
      layout: "constrained",
    }),
  },

  integrations: [
    pagefind(),
    sanity({
      projectId: 'qtgh5bm2',
      dataset: 'production',
      useCdn: false,
      apiVersion: "2026-02-10",
      studioBasePath: '/studio',
    }),
    react(),
  ],

  adapter: cloudflare(),

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '${stylesDir}/variables' as *; @use '${stylesDir}/mixins' as *; @use '${stylesDir}/fonts' as *;`,
        },
      },
    },
  },
});