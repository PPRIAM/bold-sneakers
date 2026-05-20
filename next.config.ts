import type { NextConfig } from "next";

const basePath = process.env.BASE_PATH || (process.env.GITHUB_PAGES === "true" ? "/bold-sneakers" : "");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

