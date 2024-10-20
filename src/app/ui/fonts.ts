import localFont from 'next/font/local'

// eslint-disable-next-line import/prefer-default-export
export const Pretendard = localFont({
  src: [
    {
      path: '../../../public/fonts/PretendardThin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PretendardExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PretendardLight.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PretendardMedium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PretendardSemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PretendardBold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PretendardExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PretendardBlack.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--my-custom-font',
  display: 'swap',
})

export const aktiv = localFont({
  src: [
    {
      path: '../../../public/fonts/aktiv/AktivGroteskExBasic-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/aktiv/AktivGroteskExBasic-Medium.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/aktiv/AktivGroteskExBasic-Regular.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--my-custom-aktiv',
  display: 'swap',
})
