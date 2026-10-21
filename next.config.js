/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'upload.wikimedia.org'],
  },
};

module.exports = nextConfig;
