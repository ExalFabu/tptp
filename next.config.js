// @ts-check

const pwa = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    reloadOnOnline: false,
    runtimeCaching,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: function (config, { isServer, webpack }) {
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /cheerio/ })
      );
    }
    return config;
  },
  productionBrowserSourceMaps: true,
  rewrites: async () => {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = withPlugins([withBundleAnalyzer, pwa], nextConfig);
