'use client'

import Button from '@/components/button/button'
import Input from '@/components/input/input'
import { useUserInfoStore } from '@/stores/user-info'
import { InputWarningProps, PasswordChangeSchema, PasswordChangeType } from '@/types/form/form-schema'
import { FormPasswordValues } from '@/types/props/props'
import { regexCheck, regexPassword } from '@/utils/regex/regex'
import interceptorClient from '@/services/mutator/interceptorClient'
import { showSnakbar } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/locales/client'
import { PASSWORD_MIN_LENGTH } from '@/constants/numbers'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { StyledForm } from '../../signin/_client/form/style-form'

export default function MyPageEditPasswordPage() {
  const router = useRouter()
  const t = useI18n()
  const profile = useUserInfoStore((state) => state.profile)
  const [isError, setIsError] = useState(false)

  const formMethod = useForm<PasswordChangeType>({
    resolver: zodResolver(PasswordChangeSchema),
  })
  const { watch, getValues, register, formState, handleSubmit } = formMethod

  const onSubmit: SubmitHandler<FormPasswordValues> = async (formDatas) => {
    if (formDatas.password !== formDatas.passwordCheck) {
      showSnakbar('', t('snackbar.errEditPassword'), profile)
      setIsError(true)
    } else {
      try {
        await interceptorClient.put('/users/password', {
          newPassword: formDatas.password,
          currentPassword: formDatas.beforePassword,
        })
        showSnakbar('', t('snackbar.succPasswrordChange'), profile)
        setIsError(false)
        router.back()
      } catch (error: any) {
        showSnakbar('', error.message, profile)
      }
    }
  }
  const passwordWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('beforePassword'), regexPassword) && getValues('beforePassword')?.length > 0,
    warningMessage: t('sign.form.password-error', { lengths: PASSWORD_MIN_LENGTH }),
  }
  const nPasswordWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('password'), regexPassword) && getValues('password')?.length > 0,
    warningMessage: t('sign.form.password-error', { lengths: PASSWORD_MIN_LENGTH }),
  }
  const nCPasswordWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('passwordCheck'), regexPassword) && getValues('passwordCheck')?.length > 0,
    warningMessage: t('sign.form.password-error', { lengths: PASSWORD_MIN_LENGTH }),
  }

  return (
    <FormProvider {...formMethod}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            width: '425px',
          }}
        >
          <div>
            <p className="f_18 f_bold c_black">{t('mypage.password-title')}</p>
          </div>

          <div
            style={{
              paddingTop: '1.5rem',
            }}
          >
            <Input
              ref={register('beforePassword').ref}
              onChange={register('beforePassword').onChange}
              onBlur={register('beforePassword').onBlur}
              name={register('beforePassword').name}
              value=""
              label={t('mypage.current-password')}
              inputType="password"
              placeholder={t('sign.form.password-error', { lengths: PASSWORD_MIN_LENGTH })}
              height="44px"
              warning={passwordWarning}
            />
          </div>

          <div
            style={{
              paddingTop: '1rem',
            }}
          >
            <Input
              ref={register('password').ref}
              onChange={register('password').onChange}
              onBlur={register('password').onBlur}
              name={register('password').name}
              value=""
              label={t('mypage.new-password')}
              inputType="password"
              placeholder={t('sign.form.password-error', { lengths: PASSWORD_MIN_LENGTH })}
              height="44px"
              warning={nPasswordWarning}
            />
          </div>

          <div
            style={{
              paddingTop: '1rem',
            }}
          >
            <Input
              ref={register('passwordCheck').ref}
              onChange={register('passwordCheck').onChange}
              onBlur={register('passwordCheck').onBlur}
              name={register('passwordCheck').name}
              value=""
              label={t('mypage.re-password')}
              inputType="password"
              placeholder={t('sign.form.password-error', { lengths: PASSWORD_MIN_LENGTH })}
              height="44px"
              warning={nCPasswordWarning}
            />
          </div>

          {isError && (
            <div
              className="text_center c_danger f_10"
              style={{
                paddingTop: '1rem',
                paddingBottom: '1.5rem',
              }}
            >
              {t('mypage.password-desc1')}
              <br />
              {t('mypage.password-desc2')}
            </div>
          )}

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
