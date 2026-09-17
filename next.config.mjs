import { LEGACY_REDIRECTS } from "./packages/content/redirects.mjs";

/**
 * Development and production builds write to separate directories.
 *
 * `next dev` and `next build` both write to `.next` by default, so running a
 * production build while a dev server is running overwrites the dev server's
 * webpack chunks underneath it. The dev server then serves modules that no
 * longer match its own registry and every page fails with:
 *
 *   TypeError: __webpack_modules__[moduleId] is not a function
 *
 * Isolating the two means a build can never corrupt a running dev server.
 * `next build` and `next start` are unaffected: both run with
 * NODE_ENV=production and continue to use `.next`.
 */
const distDir = process.env.NODE_ENV === "development" ? ".next-dev" : ".next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir,

  // Allow the Arena preview host (and localhost) to reach the dev server.
  allowedDevOrigins: ["localhost", "127.0.0.1", "*.e2b.app", "*.arena.ai"],

  // Redirects from the previous site, defined in packages/content so they stay
  // with the rest of the institutional record.
  async redirects() {
    return LEGACY_REDIRECTS.map((redirect) => ({
      ...redirect,
      permanent: true,
    }));
  },
};

export default nextConfig;
