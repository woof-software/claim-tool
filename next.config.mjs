/** @type {import('next').NextConfig} */
const AGORA_API_URL = process.env.AGORA_API_URL;
const AGORA_API_KEY = process.env.AGORA_API_KEY;
const RAILWAY_ENVIRONMENT_NAME = process.env.RAILWAY_ENVIRONMENT_NAME;
const S3_STORAGE_ENDPOINT = process.env.S3_STORAGE_ENDPOINT;
const S3_STORAGE_PORT = process.env.S3_STORAGE_PORT;
const S3_STORAGE_ACCESS_KEY = process.env.S3_STORAGE_ACCESS_KEY;
const S3_STORAGE_SECRET_KEY = process.env.S3_STORAGE_SECRET_KEY;
const S3_STORAGE_BUCKET_NAME = process.env.S3_STORAGE_BUCKET_NAME;

const nextConfig = {
  env: {
    AGORA_API_URL: AGORA_API_URL,
    AGORA_API_KEY: AGORA_API_KEY,
    RAILWAY_ENVIRONMENT_NAME,
    S3_STORAGE_ENDPOINT,
    S3_STORAGE_PORT,
    S3_STORAGE_ACCESS_KEY,
    S3_STORAGE_SECRET_KEY,
    S3_STORAGE_BUCKET_NAME,
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
