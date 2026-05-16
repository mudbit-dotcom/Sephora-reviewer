/**
 * svelte.config.js  SvelteKit Configuration
 *
 * This file tells SvelteKit how to build your site.
 * The most important setting here is the "adapter" which determines
 * what kind of output is created when you run `npm run build`.
 *
 * We use @sveltejs/adapter-static which creates plain HTML/CSS/JS files
 * that can be hosted on any static file server (like GitHub Pages).
 *
 * Learn more: https://svelte.dev/docs/kit/configuration
 */
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Enable SCSS preprocessing in <style lang="scss"> blocks
  preprocess: vitePreprocess(),
 kit: {
  adapter: adapter({
    pages: 'build',
    assets: 'build',
    fallback: '404.html',
    precompress: false,
    strict: true,
  }),
  paths: {
    base: process.env.BASE_PATH || '',
    relative: false,
  },
  prerender: {
    handleHttpError: 'warn'
  }
}
};

export default config;
