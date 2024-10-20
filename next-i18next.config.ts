// import path from 'path'

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
  },
  // localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : '/locales',
}
