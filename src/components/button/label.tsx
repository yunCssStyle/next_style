import { colorBlack, colorWhite } from '@/constants/theme'
import { styled } from 'styled-components'

type EnumLabelTheme = 'default' | 'warning'

interface LabelStyleProps {
  $themes: EnumLabelTheme
  $paddingLR?: string
  $borderRadius?: string
  $width?: string
  $authHeight?: boolean
  $lineHeight?: string
}

const themeBg = {
  default: colorWhite,
  warning: '#E16B7D',
}
const themeColor = {
  default: colorBlack,
  warning: colorWhite,
}
const borderColor = {
  default: colorBlack,
  warning: '#E16B7D',
}

const StyledButton = styled.label<LabelStyleProps>`
  /* 공통 */
  display: inline-flex;
  align-items: center;
  outline: none;
  border: 1px solid ${(props) => borderColor[props.$themes]};
  border-radius: ${(props) => props.$borderRadius ?? '3px'};
  color: ${(props) => themeColor[props.$themes]};
  font-weight: 700;
  padding: ${(props) => (props.$authHeight ? '0.25rem 0.25rem' : '0')};
  padding-left: ${(props) => props.$paddingLR};
  padding-right: ${(props) => props.$paddingLR};
  justify-content: center;
  white-space: ${(props) => (props.$authHeight ? 'unset' : 'nowrap')};
  box-sizing: border-box;
  text-align: center;
  /*크기 */
  width: ${(props) => props.$width};
  height: ${(props) => (props.$authHeight ? 'auto' : '0.875rem')};
  font-size: 0.625rem;
  line-height: ${(props) => props.$lineHeight ?? '1'};

  /*색상 */
  background-color: ${(props) => themeBg[props.$themes]};
  &:hover {
    opacity: 0.7;
  }
  &:active {
    background-color: ${(props) => themeBg[props.$themes]};
  }
`
interface LabelProps {
  children: React.ReactNode
  theme?: EnumLabelTheme
  paddingLR?: string
  borderRadius?: string
  width?: string
  bgColor?: string
  textColor?: string
  authHeight?: boolean
  lineHeight?: string
}

export default function Label({
  theme = 'default',
  children,
  paddingLR,
  borderRadius,
  width = '100%',
  bgColor,
  textColor,
  authHeight = false,
  lineHeight = '1',
}: LabelProps) {
  return (
    <StyledButton
      $authHeight={authHeight}
      $themes={theme}
      $paddingLR={paddingLR}
      $borderRadius={borderRadius}
      $width={width}
      $lineHeight={lineHeight}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: bgColor,
      }}
    >
      {children}
    </StyledButton>
  )
}
