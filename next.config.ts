import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wyhuqismvawczoawlkhd.supabase.co",
      },
    ],
  },

  turbopack: {
    // ✅ updated name — replaces "turbo"
    rules: {
      // Configure Turbopack rules here
    },
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
