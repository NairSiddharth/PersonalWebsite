/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // Required for static export
  images: {
    unoptimized: true // If you use <Image> component, needed for static export
  }
};

module.exports = nextConfig;
