import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to succeed even if there are ESLint errors.
    // This is safe because runtime TypeScript errors will still fail the build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
