/**
 * ALIEN DESIGN SYSTEM — Next.js Configuration
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Otimiza imports de pacotes
    optimizePackageImports: ['lucide-react'],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
