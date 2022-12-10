/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'image.tmdb.org',
    //     pathname: '/t/p/w500',
    //   },
    // ],
  },
};

module.exports = nextConfig;
