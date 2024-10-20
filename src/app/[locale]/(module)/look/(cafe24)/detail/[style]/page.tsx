import { redirect } from 'next/navigation'
import Script from 'next/script'
import DetailStyleClient from '../_client/container'

declare global {
  interface Window {
    Kakao: any
  }
}

export default function DetailStylePage({
  params,
}: {
  params: {
    style: string
  }
}) {
  if (!params) {
    redirect(`/notfound`)
  }
  return params ? (
    <>
      <DetailStyleClient id={params.style} />
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
    </>
  ) : null
}
