/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
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
