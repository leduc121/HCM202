import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubActions ? "/HCM202" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubActions ? "/HCM202" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
