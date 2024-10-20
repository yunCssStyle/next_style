import { setStaticParamsLocale } from 'next-international/server'
import StyleMain from './_client/container'

export default function MainPage({ params }: { params: { locale: string } }) {
  setStaticParamsLocale(params.locale)
  return <StyleMain />
}
