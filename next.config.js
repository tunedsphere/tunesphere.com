
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true, // Corrected the value to a boolean
  experimental: {
    serverActions: true,
  },
  // ... your other Next.js configuration options
};

module.exports = withBundleAnalyzer(withAxiom(nextConfig));