/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  webp: {
   preset: "default",
   quality: 100,
  },
  domains: ["tech-tools.fedev.me"],
  remotePatterns: [
   {
    protocol: "http",
    hostname: "localhost",
   },
   {
    protocol: "https",
    hostname: "tech-tools.fedev.me",
   },
  ],
 },
};

export default nextConfig;
