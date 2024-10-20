'use client'

import { EnumTheme, colorPoint, themeBg, themeColor } from '@/constants/theme'
import { RotatingLines } from 'react-loader-spinner'
import styled from 'styled-components'

export type EnumButtonSize =
  | 'mini'
  | 'smallF'
  | 'small'
  | 'smallR'
  | 'medium'
  | 'mediumMax'
  | 'cerMedium'
  | 'cerMediumMax'
  | 'largeMax'
type EnumButtonType = 'button' | 'submit' | 'reset' | 'label'

interface ButtonStyleProps {
  $size: EnumButtonSize
  $themes: EnumTheme
  $paddingLR?: string
  $borderRadius?: string
  $border?: string
  $noCursor?: boolean
  $fontWeight?: string
  type: EnumButtonType
}
const sizedW = {
  mini: 'auto',
  smallF: '24px',
  small: 'auto',
  smallR: 'auto',
  medium: 'auto',
  mediumMax: '100%',
  cerMedium: 'auto',
  cerMediumMax: '100%',
  largeMax: '100%',
}
const sizedH = {
  mini: '20px',
  smallF: '24px',
  small: '30px',
  smallR: '32px',
  medium: '40px',
  mediumMax: '40px',
  cerMedium: '44px',
  cerMediumMax: '44px',
  largeMax: '77px',
}
const sizedF = {
  mini: '0.625rem',
  smallF: '0.7rem',
  small: '0.75rem',
  smallR: '0.75rem',
  medium: '0.875rem',
  mediumMax: '0.875rem',
  cerMedium: '0.875rem',
  cerMediumMax: '0.875rem',
  largeMax: '0.75rem',
}

const StyledButton = styled.button.attrs((props) => ({ type: props.type }))<ButtonStyleProps>`
  /* 공통 */
  display: inline-flex;
  align-items: center;
  outline: none;
  border: ${(props) => props.$border ?? '0'};
  border-radius: ${(props) => props.$borderRadius ?? '3px'};
  color: ${(props) => themeColor[props.$themes]};
  font-weight: ${(props) => props.$fontWeight ?? '700'};
  cursor: ${(props) => (props.$noCursor ? 'default' : 'pointer')};
  padding-left: ${(props) => props.$paddingLR};
  padding-right: ${(props) => props.$paddingLR};
  justify-content: center;
  white-space: nowrap;
  box-sizing: border-box;
  transition: background-color, 0.5s;
  /*크기 */
  width: ${(props) => sizedW[props.$size]};
  height: ${(props) => sizedH[props.$size]};
  font-size: ${(props) => sizedF[props.$size]};

  /*색상 */
  background-color: ${(props) => themeBg[props.$themes]};
  &:hover {
    opacity: 0.7;
  }
  &:active {
    background-color: ${(props) => themeBg[props.$themes]};
  }

  /* disabled */
  &:disabled {
    cursor: not-allowed;
  }

  /*기타 */
  & + & {
    margin-left: 0.5rem;
  }
`
interface ButtonProps {
  children: React.ReactNode
  size?: EnumButtonSize
  theme?: EnumTheme
  border?: string
  type?: EnumButtonType
  disabled?: boolean
  loading?: boolean
  paddingLR?: string
  borderRadius?: string
  marginReset?: boolean
  noCursor?: boolean
  fontWeight?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  children,
  size = 'medium',
  theme = 'primary',
  disabled = false,
  loading = false,
  paddingLR = '1rem',
  border = '0',
  borderRadius = '0.5rem',
  marginReset = false,
  noCursor = false,
  type = 'button',
  fontWeight = '700',
  onClick = () => {},
}: ButtonProps) {
  return (
    <StyledButton
      $size={size}
      $themes={theme}
      $paddingLR={paddingLR}
      $borderRadius={borderRadius}
      $noCursor={noCursor}
      $fontWeight={fontWeight}
      disabled={disabled}
      onClick={onClick}
      style={{
        marginLeft: `${marginReset ? '0px' : ''}`,
        border: `${border}`,
      }}
      type={type}
    >
      {loading ? (
        <RotatingLines
          width="16"
          strokeColor={colorPoint}
          strokeWidth="2"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      ) : (
        children
      )}
    </StyledButton>
  )
}
