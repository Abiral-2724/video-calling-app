/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Uncomment if you are using server actions, otherwise remove it
    // serverActions: {},
  },
  typescript: {
    ignoreBuildErrors: true,
    
  },
 
};

module.exports = nextConfig;
