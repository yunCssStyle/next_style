'use client'

import Button from '@/components/button/button'
import TimerButton from '@/components/button/timer-button'
import Input from '@/components/input/input'
import InputButton from '@/components/input/input-button'
import { LONG_TIME, NICKNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/constants/numbers'
import { useScopedI18n } from '@/locales/client'
import interceptorClient from '@/services/mutator/interceptorClient'
import { InputWarningProps, SignUpSchema, SingUpType } from '@/types/form/form-schema'
import { FormSignUpValues } from '@/types/props/props'
import { regexCertificationNumber, regexCheck, regexEmail, regexPassword } from '@/utils/regex/regex'
import { showSnakbar } from '@/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { throttle } from 'lodash'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { StyledBtnWrapper, StyledForm, StyledInputButton } from './style-form'

type FormSignUpProps = {
  viewType: 'signUp' | 'resetPassword'
}

export default function FormContainer({ viewType }: FormSignUpProps) {
  const sign = useScopedI18n('sign')
  const snackbar = useScopedI18n('snackbar')
  const router = useRouter()
  const formMethod = useForm<SingUpType>({
    resolver: zodResolver(SignUpSchema),
  })
  const { register, watch, getValues, setValue, formState, handleSubmit } = formMethod

  // 이메일 유효성 완료
  const [isEmailCertification, setIsEmailCertification] = useState<boolean>(false)
  // 이메일 발송 완료
  const [sendEmail, setSendEmail] = useState<boolean>(false)
  // 인증번호 유효성 완료
  const [isCertificationNumber, setIsCertificationNumber] = useState<boolean>(false)
  // 인증번호 확인 완료
  const [sendCertificationNumber, setSendCertificationNumber] = useState<boolean>(false)
  // 인증번호 아이디
  const [certificationId, setCertificationId] = useState<number>(0)
  // 에러 타입
  const [errorType, setErrorType] = useState<number>(0)

  // 인풋필드 유효성 검사 부분
  const checkCertification = (certificationType: string): boolean => {
    if (certificationType === 'email') {
      if (regexCheck(watch('email'), regexEmail)) {
        // 유효성 검사 완료 시 한번만 설정
        if (!isEmailCertification) setIsEmailCertification(true)
        return true
      }
    } else if (certificationType === 'certificationNumber') {
      if (regexCheck(watch('certificationNumber'), regexCertificationNumber)) {
        // 유효성 검사 완료 시 한번만 설정
        if (!isCertificationNumber) setIsCertificationNumber(true)
        return true
      }
    }
    return false
  }
  // 메일 발송 부분
  const handleSendEmail = throttle(async () => {
    try {
      setSendEmail(true)
      await interceptorClient.post('/signin/sendEmail', {
        email: getValues('email').trim(),
        viewType,
      })
      showSnakbar('', snackbar('succSendEmail'), null)
    } catch (error: any) {
      console.error(error)
      setSendEmail(false)
      showSnakbar('', error.message, null)
    }
  }, LONG_TIME)
  // 인증코드 확인 부분
  const handleCertification = throttle(async () => {
    if (!sendCertificationNumber) {
      try {
        const result = await interceptorClient.put('/signin/sendEmail', {
          email: getValues('email').trim(),
          viewType,
          verifyCode: getValues('certificationNumber'),
        })
        showSnakbar('', snackbar('succVerCode'), null)
        setCertificationId(result.data.id)
        setErrorType(0)
        setSendCertificationNumber(true)
      } catch (error: any) {
        showSnakbar('', snackbar('errNotMatchCertificationNumber'), null)
        setValue('certificationNumber', '')
        setCertificationId(0)
        setIsCertificationNumber(false)
        setErrorType(1)
      }
    }
  }, LONG_TIME)

  const onSubmit: SubmitHandler<FormSignUpValues> = throttle(async (data) => {
    if (!formState.isValid) return
    if (data.password === data.passwordCheck) {
      const transEmail = data.email.trim()
      if (viewType === 'signUp') {
        const parts = transEmail.split('@')
        try {
          await interceptorClient.post('/signin', {
            email: transEmail,
            password: data.password,
            verificationId: certificationId,
            name: parts[0].length > NICKNAME_MAX_LENGTH ? parts[0].slice(0, 15) : parts[0],
          })
          showSnakbar('', snackbar('succSignUp'), null)
          router.replace('/signin')
        } catch (error: any) {
          showSnakbar('', error.message, null)
        }
      } else if (viewType === 'resetPassword') {
        try {
          await interceptorClient.put('/signin', {
            email: transEmail,
            password: data.password,
            verificationId: certificationId,
          })
          showSnakbar('', snackbar('succPasswrordChange'), null)
          router.replace('/signin')
        } catch (error: any) {
          showSnakbar('', error.message, null)
        }
      } else {
        showSnakbar('', snackbar('errUnknown'), null)
      }
    } else {
      setErrorType(2)
      showSnakbar('', snackbar('errNotSamePassword'), null)
    }
  }, LONG_TIME)
  // warning message
  const emailWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('email'), regexEmail) && getValues('email')?.length > 0,
    warningMessage: sign('form.email-error'),
  }
  const passwordWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('password'), regexPassword) && getValues('password')?.length > 0,
    warningMessage: sign('form.password-error', { lengths: PASSWORD_MIN_LENGTH }),
  }
  const passwordNewWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('passwordCheck'), regexPassword) && getValues('passwordCheck')?.length > 0,
    warningMessage: sign('form.password-error', { lengths: PASSWORD_MIN_LENGTH }),
  }
  const certNumberWarning: InputWarningProps = {
    isWarning:
      !regexCheck(watch('certificationNumber'), regexCertificationNumber) &&
      getValues('certificationNumber')?.length > 0,
    warningMessage: sign('form.certification-number-error'),
  }

  return (
    <motion.div initial={{ width: '100%', opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }}>
      <FormProvider {...formMethod}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledInputButton>
            <Input
              ref={register('email').ref}
              onChange={register('email').onChange}
              onBlur={register('email').onBlur}
              name={register('email').name}
              value=""
              placeholder={sign('form.email-placeholder')}
              label={sign('form.email-label')}
              height="44px"
              inputType="email"
              readOnly={sendEmail || sendCertificationNumber}
              warning={emailWarning}
            />

            <StyledBtnWrapper>
              <TimerButton
                start_Timer={sendEmail}
                endTimer={sendCertificationNumber}
                disabled={!(checkCertification('email') && !sendEmail) || sendCertificationNumber}
                theme={checkCertification('email') && !sendEmail && !sendCertificationNumber}
                handleSendEmail={handleSendEmail}
                handleReset={() => setSendEmail(false)}
              />
            </StyledBtnWrapper>
          </StyledInputButton>
          <InputButton
            value=""
            placeholder={sign('form.certification-number-placeholder')}
            label={sign('form.certification-number-label')}
            inputType="text"
            btnTitle={sign('form.certification-number-finish')}
            maxLength={6}
            height="44px"
            size="cerMedium"
            borderRadius="3px"
            formRegister={register('certificationNumber')}
            enableBtn={
              checkCertification('certificationNumber') && isEmailCertification && sendEmail && certificationId === 0
            }
            readOnly={(!(isEmailCertification && sendEmail) || isCertificationNumber) && certificationId !== 0}
            onClick={handleCertification}
            warning={certNumberWarning}
          />
          <div className="p_r">
            <Input
              ref={register('password').ref}
              onChange={register('password').onChange}
              onBlur={register('password').onBlur}
              name={register('password').name}
              value=""
              placeholder={sign('form.password-placeholder')}
              label={sign('form.new-password-label')}
              height="44px"
              inputType="password"
              readOnly={!sendCertificationNumber}
              warning={passwordWarning}
            />
          </div>
          <div className="p_r">
            <Input
              ref={register('passwordCheck').ref}
              onChange={register('passwordCheck').onChange}
              onBlur={register('passwordCheck').onBlur}
              name={register('passwordCheck').name}
              value=""
              placeholder={sign('form.re-password-placeholder')}
              label={sign('form.re-password-label')}
              height="44px"
              inputType="password"
              readOnly={!sendCertificationNumber}
              warning={passwordNewWarning}
            />
          </div>
          {errorType !== 0 && (
            <div
              className="text_center"
              style={{
                marginBottom: '1rem',
              }}
            >
              <p className="f_10 c_danger text-preWrap" role="alert">
                {errorType === 1 ? snackbar('errNotMatchCertificationNumber') : snackbar('errNotMatchPassword')}
              </p>
            </div>
          )}
          <Button
            size="cerMediumMax"
            theme={formState.isValid ? 'primary' : 'secondary'}
            type="submit"
            disabled={!formState.isValid}
            borderRadius="3px"
          >
            {viewType === 'resetPassword' ? sign('reset-password-btn') : sign('sign-up')}
          </Button>
        </StyledForm>
      </FormProvider>
    </motion.div>
  )
}
