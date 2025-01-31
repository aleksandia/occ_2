/** @type {import('next').NextConfig} */
const path = require('path');

const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    // Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Hier wird der Alias 'components' auf den absoluten Pfad des components-Ordners gesetzt:
      'components': path.resolve(__dirname, 'components'),
    };
    return config;
  },
};

module.exports = config;
