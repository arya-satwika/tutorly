import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4zj2fsf4qc.ucarecd.net',
      },
    ],
  },
};

export default nextConfig;
