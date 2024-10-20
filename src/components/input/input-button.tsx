'use client'

import { styled } from 'styled-components'
import { UseFormRegisterReturn, useFormContext } from 'react-hook-form'
import { InputWarningProps } from '@/types/form/form-schema'
import Input from './input'
import Button, { EnumButtonSize } from '../button/button'

const StyledInputButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const StyledBtnWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column-reverse;
  margin-left: 4px;
`

interface InputButtonProps {
  value: string
  placeholder: string
  label?: string
  size?: EnumButtonSize
  height?: string
  inputType?: string
  btnTitle: string
  borderRadius?: string
  enableBtn?: boolean
  maxLength?: number
  formRegister: UseFormRegisterReturn<any>
  readOnly?: boolean
  warning?: InputWarningProps
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function InputButton({
  value = '',
  placeholder = '',
  label = '',
  size = 'medium',
  height = '40px',
  inputType = '',
  btnTitle = '',
  borderRadius = '0.5rem',
  maxLength = 524288,
  enableBtn = false,
  formRegister,
  readOnly = false,
  warning = {
    isWarning: false,
    warningMessage: '',
  },
  onClick = () => {},
}: InputButtonProps) {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <StyledInputButton>
      <Input
        value={value}
        placeholder={placeholder}
        label={label}
        height={height}
        inputType={inputType}
        aria-invalid={errors.email ? 'true' : 'false'}
        maxLength={maxLength}
        {...formRegister}
        readOnly={readOnly}
        warning={warning}
      />
      <StyledBtnWrapper>
        <Button
          size={size}
          disabled={!enableBtn}
          theme={enableBtn ? 'primary' : 'secondary'}
          onClick={onClick}
          borderRadius={borderRadius}
        >
          {btnTitle}
        </Button>
      </StyledBtnWrapper>
    </StyledInputButton>
  )
}
