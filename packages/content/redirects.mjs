/**
 * Redirects from the previous site.
 *
 * Plain JavaScript rather than TypeScript, because next.config.mjs loads
 * before any compilation happens and therefore cannot import a .ts module.
 * packages/content/global.ts re-exports this list, so it stays the single
 * source of truth for both the config and the site.
 */

export const LEGACY_REDIRECTS = [
  { source: "/about", destination: "/institution" },
  { source: "/areas-of-study", destination: "/departments" },
  { source: "/topics", destination: "/departments" },
  { source: "/archive", destination: "/database" },
  { source: "/podcast", destination: "/media" },
  { source: "/press", destination: "/newsroom" },
  { source: "/blog", destination: "/newsroom" },
  { source: "/contact", destination: "/engage" },
  { source: "/donate", destination: "/support" },
  { source: "/newsletters", destination: "/newsletter" },
  { source: "/imboni", destination: "/institution/imboni" },
];
