import { withContentlayer } from "next-contentlayer"

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.mjs")

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uploadthing.com", "utfs.io"],
  },
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
export default withContentlayer(nextConfig)
