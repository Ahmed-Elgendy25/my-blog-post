import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb' // Increase the limit to 4MB
    }
  }
};

export default nextConfig;
