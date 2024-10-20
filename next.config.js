const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `
      $olivela-font-url: "${process.env.NEXT_PUBLIC_OLIVELA_FONT_PATH}";
    `,
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드 에러 방지
  },
  transpilePackages: ['next-international', 'international-types'],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.stylelook.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.stylemanager.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.stylebot.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'j-blin.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // i18n
  // i18n,
  webpack(config) {
    config.cache = false
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
  // nextjs 13 이후 발생하는 svg 이슈 수정
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig
