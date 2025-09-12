/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false // If you use <Image> component, needed for static export
  },
  // Disable caching for Cloudflare Pages build size limits
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;
