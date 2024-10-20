import { EnumTheme, themeBg, themeColor } from '@/constants/theme'
import { styled } from 'styled-components'

type EnumButtonType = 'style' | 'rounded'
type EnumButtonSize = 'small' | 'medium'

interface StyledBadgeProps {
  $top: string
  $right: string
  $theme: EnumTheme
  $type: EnumButtonType
  $size: EnumButtonSize
  $anim: boolean
  $padding: string
}

const fontSize = {
  small: '0.5rem',
  medium: '0.875rem',
}

const StyledBadge = styled.span<StyledBadgeProps>`
  position: absolute;
  top: ${({ $top }) => $top};
  right: ${({ $right }) => $right};
  background-color: ${({ $theme }) => themeBg[$theme]};
  border-radius: ${({ $type }) => ($type === 'style' ? '50%' : '2.5rem')};
  font-size: ${(props) => fontSize[props.$size]};
  font-weight: 700;
  color: ${({ $theme }) => themeColor[$theme]};
  padding: ${({ $padding }) => $padding};
  p {
    animation: ${({ $anim }) => ($anim ? 'jump 7s ease-in-out infinite' : 'none')};
    transform-origin: bottom center;
  }
`
interface BadgeProps {
  top?: string
  right?: string
  children: React.ReactNode
  theme?: EnumTheme
  size?: EnumButtonSize
  type?: EnumButtonType
  padding?: string
  anim?: boolean
}

export default function Badge({
  top = '-20px',
  right = '0',
  children,
  theme = 'primary',
  type = 'rounded',
  padding = '0.125rem 0.8125rem',
  size = 'medium',
  anim = false,
}: BadgeProps) {
  return (
    <StyledBadge $right={right} $top={top} $theme={theme} $type={type} $anim={anim} $size={size} $padding={padding}>
      <p>{children}</p>
    </StyledBadge>
  )
}
