/** @type {import('next').NextConfig} */

const { withAxiom } = require("next-axiom")

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uploadthing.com"],
  }, // Corrected the value to a boolean
  experimental: {
    serverActions: true,
  },
  /** Linting and typechecking are already done as separate tasks in the CI pipeline */
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
}
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(withAxiom(nextConfig))
