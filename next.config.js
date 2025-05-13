/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: {
      rules: {
        // Configure Turbopack rules here
      },
    },
    serverActions: {
      bodySizeLimit: '4mb' // Increase the limit to 4MB
    }
  }
};

module.exports = nextConfig;
