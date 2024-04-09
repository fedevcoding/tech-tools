/** @type {import('next').NextConfig} */
const nextConfig = {
 webp: {
  preset: "default",
  quality: 100,
 },
 images: {
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
