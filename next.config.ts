/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Allow images from Sanity's CDN
  },
};

module.exports = nextConfig;
