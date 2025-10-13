import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of route groups
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  // Ensure proper handling of client components
  reactStrictMode: true,
};

export default nextConfig;