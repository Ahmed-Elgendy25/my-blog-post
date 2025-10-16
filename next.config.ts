import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wyhuqismvawczoawlkhd.supabase.co",
        pathname: "/storage/v1/object/public/**", // ✅ allow all public storage paths
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  turbopack: {},
};

export default nextConfig;
