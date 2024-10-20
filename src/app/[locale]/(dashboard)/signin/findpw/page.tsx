import TextCaption from '@/components/text/text-caption'
import { getScopedI18n } from '@/locales/server'
import FormContainer from '../_client/form/form-container'

export default async function FindPWPage() {
  const sign = await getScopedI18n('sign')
  return (
    <>
      <p
        className="text_center f_bold f-22 c_black"
        style={{
          marginBottom: '1rem',
        }}
      >
        {sign('reset-password')}
      </p>
      <TextCaption>{sign('reset-password-description')}</TextCaption>
      <div
        style={{
          marginTop: '1.5rem',
          width: '100%',
        }}
      >
        <FormContainer viewType="resetPassword" />
      </div>
    </>
  )
}
