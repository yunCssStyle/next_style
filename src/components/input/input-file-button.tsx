'use client'

import { styled } from 'styled-components'
import { UseFormRegisterReturn, useFormContext } from 'react-hook-form'
import { useRef } from 'react'
import Button from '../button/button'
import { StyledInput, StyledInputContainer } from './input-style'

const StyledInputButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const StyledBtnWrapper = styled.div`
  margin-bottom: 0rem;
  display: flex;
  flex-direction: column-reverse;
  margin-left: 4px;
`
interface InputFileButtonProps {
  placeholder: string
  label?: string
  btnTitle: string
  enableBtn?: boolean
  maxLength?: number
  formRegister: UseFormRegisterReturn<any>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  accept?: string
}

export default function InputFileButton({
  placeholder = '',
  label = '',
  btnTitle = '',
  maxLength = 524288,
  enableBtn = false,
  formRegister,
  onClick = () => {},
  onChange = () => {},
  accept,
}: InputFileButtonProps) {
  const {
    formState: { errors },
  } = useFormContext()

  const hiddenFileInput = useRef<HTMLInputElement | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click()
    } else {
      onClick(e)
    }
  }

  return (
    <StyledInputButton>
      <StyledInputContainer $marginBottom="0rem">
        {label && <label htmlFor={formRegister.name}>{label}</label>}
        <StyledInput
          value=""
          name={formRegister.name}
          placeholder={placeholder}
          aria-invalid={errors.email ? 'true' : 'false'}
          maxLength={maxLength}
          readOnly
          $height="40px"
          $paddLeft="1rem"
          $paddRight="1rem"
        />
      </StyledInputContainer>
      <input
        id={formRegister.name}
        type="file"
        {...formRegister}
        ref={(el) => {
          hiddenFileInput.current = el as HTMLInputElement
          formRegister.ref(el)
        }}
        style={{ display: 'none' }}
        onChange={(e) => {
          formRegister.onChange(e)
          onChange(e)
        }}
        accept={accept}
      />
      <StyledBtnWrapper>
        <Button size="medium" disabled={!enableBtn} theme={enableBtn ? 'primary' : 'secondary'} onClick={handleClick}>
          {btnTitle}
        </Button>
      </StyledBtnWrapper>
    </StyledInputButton>
  )
}
