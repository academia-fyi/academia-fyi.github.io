import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";
import icon from "astro-icon";

const devMode = process.env.NODE_ENV == "development";
const port = 2364;

// https://astro.build/config
export default defineConfig({
  site: devMode ? `http://localhost:${port}` : `https://academia.fyi`,
  server: { port, },
  integrations: [icon(), tailwind(), mdx(), sitemap(), db()]
});
