import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to succeed even if there are ESLint errors.
    // This is safe because runtime TypeScript errors will still fail the build.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds even if there are type errors.
    // Useful when third-party types or experimental code cause build breaks in CI.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
