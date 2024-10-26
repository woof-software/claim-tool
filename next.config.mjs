/** @type {import('next').NextConfig} */

const hostnames = ['icons.llamao.fi'];

const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
      port: '',
      pathname: '/**',
    })),
  },
};

export default nextConfig;
