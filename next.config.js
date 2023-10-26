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
  staticPageGenerationTimeout: 1000,
  output: 'standalone',
};

module.exports = nextConfig;
