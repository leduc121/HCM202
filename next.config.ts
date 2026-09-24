import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubActions ? "export" : undefined,
  trailingSlash: isGitHubActions,
  basePath: isGitHubActions ? "/HCM202" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubActions ? "/HCM202" : "",
    NEXT_PUBLIC_ADVISOR_API_URL: isGitHubActions ? "" : "/api/advisor",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
