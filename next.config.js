const withNextIntl = require('next-intl/plugin')('./i18n.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
