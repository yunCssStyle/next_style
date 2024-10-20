import { setStaticParamsLocale } from 'next-international/server'
import StylePage from './(cafe24)/_client/page'

export default function HomePage({ params }: { params: { locale: string } }) {
  setStaticParamsLocale(params.locale)
  return <StylePage />
}
