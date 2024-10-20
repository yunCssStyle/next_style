import { metaDescription, metaTitle } from '@/constants/text'
import { sharedStyleGetSharedStyle } from '@/services/generated/lookstore'
import { redirect } from 'next/navigation'
import Script from 'next/script'
import ShareStyleClient from '../_client/container'

declare global {
  interface Window {
    Kakao: any
  }
}
// 서버 사이드에서 데이터를 받아서 메타데이터를 설정합니다.
export async function generateMetadata({ params }) {
  if (!params?.style) {
    return {}
  }

  let resultImg = ''

  try {
    const result = await sharedStyleGetSharedStyle(params.style)
    resultImg = result.style.imageUrl ?? ''
  } catch (e) {
    console.error('Error fetching shared style:', e)
    resultImg = ''
  }

  const metaUrl = `${process.env.NEXT_PUBLIC_MODULE_URL}/share/${params.style}`

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(metaUrl),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: `${resultImg}?w=600&h=300&fo=ct`,
          width: 600,
          height: 300,
        },
      ],
      url: metaUrl,
    },
  }
}

export default async function ShareStylePage({
  params,
}: {
  params: {
    style: string
  }
}) {
  if (!params?.style) {
    redirect('/notfound')
  }

  let result

  try {
    result = await sharedStyleGetSharedStyle(params.style)
  } catch (error) {
    console.error('Error fetching shared style:', error)
    redirect('/error')
  }

  if (!result) {
    redirect('/notfound') // Handle case where result is null
  }

  return (
    <>
      <ShareStyleClient uri={params.style} styleItem={result} />
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
    </>
  )
}
