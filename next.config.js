/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wyhuqismvawczoawlkhd.supabase.co",
      },
    ],
  },
  reactStrictMode: true,

  turbo: {
    rules: {
      // Configure Turbopack rules here
    },

    serverActions: {
      bodySizeLimit: "4mb", // Increase the limit to 4MB
    },
  },
};

module.exports = nextConfig;
