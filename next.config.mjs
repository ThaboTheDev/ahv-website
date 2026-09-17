import { LEGACY_REDIRECTS } from "./packages/content/redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
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
