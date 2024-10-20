'use client'

import Button from '@/components/button/button'
import Input from '@/components/input/input'
import { NICKNAME_MAX_LENGTH } from '@/constants/numbers'
import { useI18n } from '@/locales/client'
import interceptorClient from '@/services/mutator/interceptorClient'
import { setNickName, useUserInfoStore } from '@/stores/user-info'
import { InputWarningProps, NickNameSchema, NickNameType } from '@/types/form/form-schema'
import { FormNickNameValues } from '@/types/props/props'
import { regexCheck, regexMinLengthNoSpace, regexSpace } from '@/utils/regex/regex'
import { showSnakbar } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyledForm } from '../../signin/_client/form/style-form'

export default function MyPageEditNickNamePage() {
  const router = useRouter()
  const t = useI18n()
  const { nickName, profile: profile } = useUserInfoStore()
  const formMethod = useForm<NickNameType>({
    resolver: zodResolver(NickNameSchema),
  })
  const { watch, getValues, register, formState, handleSubmit } = formMethod

  const onSubmit: SubmitHandler<FormNickNameValues> = async () => {
    if (getValues('nickName').length > NICKNAME_MAX_LENGTH) {
      showSnakbar('', t('snackbar.errNickName', { value: NICKNAME_MAX_LENGTH }), profile)
      return
    }
    try {
      const nickNameRes = await interceptorClient.put('/users/me', {
        name: getValues('nickName'),
      })
      showSnakbar('', t('snackbar.succEditName'), profile)
      setNickName(nickNameRes.data.name)
      router.back()
    } catch (error: any) {
      showSnakbar('', error.message, profile)
    }
  }
  const nNickNameWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('nickName'), regexMinLengthNoSpace),
    warningMessage: regexCheck(watch('nickName'), regexSpace)
      ? t('snackbar.errNickNameNotSpace')
      : t('snackbar.errNickName', { value: NICKNAME_MAX_LENGTH }),
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className="f_18 f_bold c_black">{t('mypage.nickName-title')}</p>
      </div>

      <div
        style={{
          paddingTop: '1rem',
        }}
      >
        <Input
          ref={register('nickName').ref}
          onChange={register('nickName').onChange}
          onBlur={register('nickName').onBlur}
          name={register('nickName').name}
          value={nickName ?? ''}
          placeholder={t('mypage.nickName-placeholder', { value: NICKNAME_MAX_LENGTH })}
          label=""
          height="44px"
          maxLength={NICKNAME_MAX_LENGTH}
          inputType="text"
          warning={nNickNameWarning}
        />
      </div>

      <div
        className="flex_row"
        style={{
          justifyContent: 'end',
          width: '100%',
          gap: '0.5rem',
          paddingTop: '0.5rem',
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
    </StyledForm>
  )
}
