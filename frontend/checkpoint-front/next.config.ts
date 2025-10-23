import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnb.artstation.com',
        port: '',
        pathname: '/p/assets/covers/images/**',
      },
    ],
  },
};

export default nextConfig;
