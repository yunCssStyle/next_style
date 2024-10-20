import { getScopedI18n } from '@/locales/server'
import MainLogo from '@/components/logo/main-logo'
import TextCaption from '@/components/text/text-caption'
import { setStaticParamsLocale } from 'next-international/server'
import SignFormContainer from './_client/form/sign-form-container'

export default async function SignInPage({ params: { locale } }: { params: { locale: string } }) {
  setStaticParamsLocale(locale)
  const sign = await getScopedI18n('sign')
  return (
    <>
      <MainLogo type="login" />
      <div
        style={{
          width: '100%',
          paddingTop: '1rem',
          paddingBottom: '1.5rem',
        }}
      >
        <TextCaption>{sign('title')}</TextCaption>
      </div>
      <SignFormContainer />
    </>
  )
}
