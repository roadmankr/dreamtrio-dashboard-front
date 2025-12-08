import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
    typedEnv: true,
    // typedRoutes: true,
  },
};

export default nextConfig;
