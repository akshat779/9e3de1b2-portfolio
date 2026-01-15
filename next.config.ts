import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip type checking during build for faster deployments
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
