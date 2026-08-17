import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/mycompany-data-bucket-dev/**",
      },
    ],
  }
  /* config options here */
};

export default nextConfig;
