import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? "/online-developer-tools" : "",
  assetPrefix: isProd ? "/online-developer-tools/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
