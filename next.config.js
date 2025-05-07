/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb' // Increase the limit to 4MB
    }
  }
};

module.exports = nextConfig;
