
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { withContentlayer } = require("next-contentlayer");


/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uploadthing.com", "utfs.io"],
  },

}
module.exports = withContentlayer(nextConfig);
