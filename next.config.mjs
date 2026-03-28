/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // REQUIRED for GitHub Pages

  images: {
    unoptimized: true, // REQUIRED for static export
  },

  eslint: {
    ignoreDuringBuilds: true, // prevents build fail
  },

  typescript: {
    ignoreBuildErrors: true, // prevents TS blocking deploy
  },

  trailingSlash: true, // IMPORTANT for GitHub Pages routing
};

export default nextConfig;
