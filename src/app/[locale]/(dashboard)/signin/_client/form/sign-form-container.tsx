'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FormSignInValues } from '@/types/props/props'
import { useScopedI18n } from '@/locales/client'
import { regexCheck, regexEmail, regexPassword } from '@/utils/regex/regex'
import { InputWarningProps, LogInType, LoginSchema } from '@/types/form/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { showSnakbar } from '@/utils/utils'
import { throttle } from 'lodash'
import { useRouter } from 'next/navigation'
import { LONG_TIME, PASSWORD_MIN_LENGTH } from '@/constants/numbers'
import { StyledNoAccount, StyledForm } from './style-form'
import BottomBorderButton from '@/components/button/bottom-border-button'

export default function SignFormContainer() {
  const sign = useScopedI18n('sign')
  const snackbar = useScopedI18n('snackbar')
  const router = useRouter()
  const formMethod = useForm<LogInType>({
    resolver: zodResolver(LoginSchema),
  })
  const { register, watch, formState, handleSubmit, getValues } = formMethod
  const [errType, setErrType] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const onSubmit: SubmitHandler<FormSignInValues> = throttle(async (data) => {
    if (!formState.isValid) return
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (!response?.error) {
      router.push('/product')
      router.refresh()
    } else {
      setErrType(true)
      setLoading(false)
      showSnakbar('', snackbar('errLogin'), null)
    }
  }, LONG_TIME)
  const emailWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('email'), regexEmail) && getValues('email')?.length > 0,
    warningMessage: sign('form.email-error'),
  }
  const passwordWarning: InputWarningProps = {
    isWarning: !regexCheck(watch('password'), regexPassword) && getValues('password')?.length > 0,
    warningMessage: sign('form.password-error', { lengths: PASSWORD_MIN_LENGTH }),
  }

  return (
    <motion.div initial={{ width: '100%', opacity: 0, x: '-100%' }} animate={{ opacity: 1, x: 0 }}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
          warning={emailWarning}
        />
        <Input
          ref={register('password').ref}
          onChange={register('password').onChange}
          onBlur={register('password').onBlur}
          name={register('password').name}
          value=""
          placeholder={sign('form.password-placeholder')}
          label={sign('form.password-label')}
          height="44px"
          inputType="password"
          warning={passwordWarning}
        />
        <div
          className="text-right"
          style={{
            marginBottom: '24px',
            marginTop: '-8px',
            fontWeight: 300,
          }}
        >
          <Link href="/signin/findpw" prefetch>
            <p className="f_12 c_main">{sign('forget-password')}</p>
          </Link>
        </div>
        {errType && (
          <div
            className="text_center"
            style={{
              marginBottom: '1rem',
            }}
          >
            <p className="f_10 c_danger text-preWrap" role="alert">
              {sign('form.error')}
            </p>
          </div>
        )}
        <Button
          size="cerMediumMax"
          theme={formState.isValid && !loading ? 'primary' : 'secondary'}
          type="submit"
          disabled={!formState.isValid && !loading}
          loading={loading}
          borderRadius="3px"
        >
          {sign('login')}
        </Button>
        <div className="service_btn">
          <Button
            size="cerMediumMax"
            theme={'borderBtn'}
            type="button"
            borderRadius="3px"
            fontWeight="500"
            border="1px solid #DBDBDB"
            onClick={() => window.open('https://calendly.com/d/cprc-j5d-6zg/24', '_blank', 'noopener,noreferrer')}
          >
            {sign('service.button')}
          </Button>
        </div>
        <p className="text">{sign('service.text')}</p>
        {/* <StyledNoAccount className="f_12 c_69">
          {sign('has-no-account')}{' '}
          <Link href="/signin/signup" prefetch>
            <p className="c_main">{sign('create-account')}</p>
          </Link>
        </StyledNoAccount> */}
      </StyledForm>
    </motion.div>
  )
}
