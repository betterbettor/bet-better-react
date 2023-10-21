/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.api-sports.io',
      },
    ],
  },
};

module.exports = nextConfig;
