
/** @type {import('next').NextConfig} */


const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uploadthing.com"],
  }, // Corrected the value to a boolean
  experimental: {
    serverActions: true,
  },
  // ... your other Next.js configuration options
};
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withAxiom(nextConfig));