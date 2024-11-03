/** @type {import('next').NextConfig} */
const AGORA_API_URL = process.env.AGORA_API_URL;
const AGORA_API_KEY = process.env.AGORA_API_KEY;

const nextConfig = {
  env: {
    AGORA_API_URL: AGORA_API_URL,
    AGORA_API_KEY: AGORA_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/agora/:path*',
        destination: `${AGORA_API_URL}/:path*`,
      },
    ];
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ens.xyz',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
