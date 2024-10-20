import TextCaption from '@/components/text/text-caption'
import { getScopedI18n } from '@/locales/server'
import FormContainer from '../_client/form/form-container'

export default async function SginUpPage() {
  const sign = await getScopedI18n('sign')
  return (
    <>
      <p
        className="text_center f_bold f-22 c_black"
        style={{
          marginBottom: '1rem',
        }}
      >
        {sign('create-account')}
      </p>
      <TextCaption>{sign('create-account-description')}</TextCaption>
      <div
        style={{
          marginTop: '1.5rem',
          width: '100%',
        }}
      >
        <FormContainer viewType="signUp" />
      </div>
    </>
  )
}
