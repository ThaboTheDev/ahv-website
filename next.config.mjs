/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow the Arena preview host (and localhost) to reach the dev server.
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "*.e2b.app",
    "*.arena.ai",
  ],
};

export default nextConfig;
