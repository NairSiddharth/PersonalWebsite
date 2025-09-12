/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false // If you use <Image> component, needed for static export
  }
};

module.exports = nextConfig;
