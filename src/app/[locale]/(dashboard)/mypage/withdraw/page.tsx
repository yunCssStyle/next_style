'use client'

import Button from '@/components/button/button'
import Input from '@/components/input/input'
import interceptorClient from '@/services/mutator/interceptorClient'
import { AccountDeleteSchema, AccountDeleteType } from '@/types/form/form-schema'
import { FormWithDrawValues } from '@/types/props/props'
import { showSnakbar } from '@/utils/utils'
import { logOut, useUserInfoStore } from '@/stores/user-info'
import { zodResolver } from '@hookform/resolvers/zod'
import { useI18n } from '@/locales/client'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { StyledForm } from '../../signin/_client/form/style-form'

export default function MyPageWithDrawPage() {
  const router = useRouter()
  const t = useI18n()
  const profile = useUserInfoStore((state) => state.profile)
  const email = useUserInfoStore((state) => state.email)

  const formMethod = useForm<AccountDeleteType>({
    resolver: zodResolver(AccountDeleteSchema),
  })
  const { register, formState, handleSubmit } = formMethod

  const onSubmit: SubmitHandler<FormWithDrawValues> = async (formData) => {
    if (formState.isValid && formData.withDraw === '계정 삭제하기') {
      try {
        await interceptorClient.delete('/users/me')
        showSnakbar('', t('snackbar.succDeleteAccount'), profile)
        logOut()
        router.push('/')
      } catch (error: any) {
        showSnakbar('', error.message, profile)
      }
    }
  }

  return (
    <FormProvider {...formMethod}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            width: '407px',
          }}
        >
          <div>
            <p className="f_18 f_bold c_danger">{t('mypage.delete-account')}</p>
          </div>

          <div
            className="c_black f_12"
            style={{
              paddingTop: '1.5rem',
            }}
          >
            {t('mypage.withdraw-desc1')}
            <p className="f_bold">{email}</p> {t('mypage.withdraw-desc2')} <br />
            {t('mypage.withdraw-desc3')}
            <br />
            <br />
            {t('mypage.withdraw-desc4')}
            <p className="f_bold">{t('mypage.withdraw-desc5')}</p>
            {t('mypage.withdraw-desc6')}
          </div>

          <div
            style={{
              paddingTop: '1rem',
            }}
          >
            <Input
              ref={register('withDraw').ref}
              onChange={register('withDraw').onChange}
              onBlur={register('withDraw').onBlur}
              name={register('withDraw').name}
              value=""
              placeholder=""
              label=""
              inputType="text"
            />
          </div>

          <div
            className="flex_row"
            style={{
              justifyContent: 'end',
              width: '100%',
              gap: '0.5rem',
            }}
          >
            <div>
              <Button size="small" theme="mypage" borderRadius="3px" onClick={() => router.back()}>
                {t('common.cancle')}
              </Button>
            </div>
            <div>
              <Button
                size="small"
                theme={formState.isValid ? 'primary' : 'secondary'}
                type="submit"
                borderRadius="3px"
                disabled={!formState.isValid}
              >
                {t('common.ok')}
              </Button>
            </div>
          </div>
        </div>
      </StyledForm>
    </FormProvider>
  )
}
