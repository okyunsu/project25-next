/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      }
    ]
  },
};

module.exports = nextConfig; 