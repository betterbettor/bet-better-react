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
  output: 'standalone',
};

module.exports = nextConfig;
