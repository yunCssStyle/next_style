'use client'

import { forwardRef, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { InputWarningProps } from '@/types/form/form-schema'
import { colorPlaceholderGrey, colorPoint } from '@/constants/theme'
import { StyledInput, StyledInputContainer, StyledInputMessage } from './input-style'
import IconLock from '../icons/icon-lock'

interface InputProps {
  value: string // 기본값
  placeholder: string // placeholder 값
  label?: string // 상단에 노출될 라벨 명
  inputType?: string // input 타입 지정
  readOnly?: boolean // 읽기 전용 지정
  maxLength?: number // 최대 글자수 지정
  height?: string // 높이 지정
  marginBottom?: string // 하단 마진 지정
  leftIcon?: React.ReactNode // 왼쪽 아이콘
  leftPadding?: string // 왼쪽 패딩
  rightIcon?: React.ReactNode // 오른쪽 아이콘
  rightPadding?: string // 오른쪽 패딩
  warning?: InputWarningProps // 인풋필드 안에 노출될 경고 메시지
  fontSize?: string // 폰트 사이즈
  fontWeight?: string // 폰트 굵기
  bgColor?: string // 배경색
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, InputProps & ReturnType<UseFormRegister<any>>>(
  (
    {
      onChange,
      onBlur,
      onKeyDown,
      name,
      label,
      inputType,
      placeholder,
      value,
      readOnly = false,
      maxLength = 524288,
      height = '40px',
      marginBottom = '1rem',
      leftIcon,
      leftPadding = '1rem',
      rightIcon,
      rightPadding = '1rem',
      fontSize = '0.75rem',
      fontWeight = '500',
      bgColor = 'var(--color-white)',
      warning = { isWarning: false, warningMessage: '' },
    },
    ref,
  ) => {
    const [offView, setOffView] = useState<boolean>(true)
    const isPassword = () => {
      if (inputType === 'password') {
        if (offView) {
          return 'password'
        }
        return 'text'
      }
      return inputType
    }
    return (
      <StyledInputContainer $marginBottom={marginBottom}>
        {label && <label htmlFor={name}>{label}</label>}
        <StyledInput
          id={name}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          type={isPassword()}
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
          maxLength={maxLength}
          autoComplete={`${inputType === 'password' ? 'new-password' : 'off'}`}
          $height={height}
          $paddLeft={leftPadding}
          $paddRight={rightPadding}
          $warning={warning.isWarning}
          $fontSize={fontSize}
          $fontWeight={fontWeight}
          $bgColor={bgColor}
          onKeyDown={onKeyDown}
        />
        {leftIcon && leftIcon}
        {rightIcon && rightIcon}
        {inputType === 'password' && (
          <div
            style={{
              position: 'absolute',
              right: '0.25rem',
              bottom: '0.65rem',
              cursor: 'pointer',
            }}
            aria-label="show password"
            onClick={() => setOffView(!offView)}
            onKeyDown={() => setOffView(!offView)}
            role="button"
            tabIndex={0}
          >
            <IconLock stroke={offView ? colorPoint : colorPlaceholderGrey} />
          </div>
        )}
        <StyledInputMessage className="hidden_message">
          {warning.isWarning && warning.warningMessage}
        </StyledInputMessage>
      </StyledInputContainer>
    )
  },
)

Input.displayName = 'Input'

export default Input
