import { styled } from 'styled-components'

interface StyledInputContainerProps {
  $marginBottom?: string
}
export const StyledInputContainer = styled.div<StyledInputContainerProps>`
  position: relative;
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.$marginBottom || '1rem'};
  label {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--color-black);
    margin-bottom: 0.5rem;
  }
`
interface StyledInputProps {
  $height?: string
  $paddLeft?: string
  $paddRight?: string
  $warning?: boolean
  $color?: string
  $fontSize?: string
  $fontWeight?: string
  $bgColor?: string
}
export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  height: ${(props) => props.$height ?? '40px'};
  font-weight: ${(props) => props.$fontWeight ?? '500'};
  font-size: ${(props) => props.$fontSize ?? '0.75rem'};
  line-height: 0.875rem;
  background-color: ${(props) => props.$bgColor ?? 'var(--color-white)'};
  border: 1px solid ${(props) => (props.$warning ? 'var(--color-red)' : 'var(--color-grey)')};
  border-radius: 3px;
  padding-left: ${(props) => props.$paddLeft ?? '1rem'};
  padding-right: ${(props) => props.$paddRight ?? '1rem'};
  outline: none;
  color: ${(props) => props.$color || 'var(--color-black)'};
  box-sizing: border-box;
  &:focus {
    border-color: ${(props) => (props.$warning ? 'var(--color-red)' : 'var(--color-point)')};
  }
  &:active {
    border-color: var(--color-point);
  }
  &::placeholder {
    color: var(--color-placeholder-grey);
  }
  &:read-only {
    border-color: var(--color-grey);
    color: var(--color-placeholder-grey-disabled);
  }
  transition: border-color, 1s;
`
export const StyledTextArea = styled.textarea<StyledInputProps>`
  width: 100%;
  height: ${(props) => props.$height ?? '123px'};
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 0.875rem;
  background-color: var(--color-grey);
  border: 1px solid var(--color-grey);
  border-radius: 3px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: ${(props) => props.$paddLeft ?? '1rem'};
  padding-right: ${(props) => props.$paddRight ?? '1rem'};
  outline: none;
  color: var(--color-black);
  box-sizing: border-box;
  resize: none;
  &:focus {
    border-color: var(--color-point);
  }
  &:active {
    border-color: var(--color-point);
  }
  &::placeholder {
    color: var(--color-placeholder);
  }
`

export const StyledInputMessage = styled.div`
  position: absolute;
  bottom: 2px;
  left: 1rem;
  font-size: 0.5625rem;
  color: var(--color-red);
`
// 체크 박스
export const StyledLabel = styled.label`
  display: flex;
  vertical-align: middle;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  > span {
    min-width: fit-content;
    padding: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;
  }
`
interface StyledCheckboxProps {
  $size: number
  $labelPadding: string
}
export const StyledCheckbox = styled.input.attrs<StyledCheckboxProps>((props) => ({
  type: 'checkbox',
  checked: props.checked,
  onChange: props.onChange,
}))`
  appearance: none;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z' stroke='%23A0A6B0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  margin: 0px;

  :hover {
    cursor: pointer;
  }

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z' fill='%239A00FF' /%3E%3C/svg%3E");
  }
  & ~ span {
    padding: ${(props) => props.$labelPadding};
    white-space: nowrap;
  }
  &:checked ~ span {
    color: var(--color-point);
  }
`
