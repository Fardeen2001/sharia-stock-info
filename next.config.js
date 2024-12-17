/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  typescript: {
    // This will allow Next.js to display type errors during development
    // and fail the build if there are type errors during production builds
    ignoreBuildErrors: false,
  },
  // Enable React strict mode for improved error handling
  reactStrictMode: true,
};

module.exports = nextConfig;
