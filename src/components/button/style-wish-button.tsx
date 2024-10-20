import { styled } from 'styled-components'
import { colorHexa9a9a9, colorHexf5f5f5, colorPoint } from '@/constants/theme'
import IconBook from '../icons/icon-book'

interface StyledStyleWishButtonProps {
  $width: number
  $height: number
}
const StyledStyleWishButton = styled.div<StyledStyleWishButtonProps>`
  position: absolute;
  top: 4px;
  right: 4px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`

interface StyleWishButtonProps {
  wish?: boolean
  isHover?: boolean | React.MutableRefObject<HTMLDivElement | null>
  width?: number
  height?: number
  color?: boolean | React.MutableRefObject<HTMLDivElement | null>
}

export default function StyleWishButton({
  wish = false,
  isHover = false,
  width = 32,
  height = 32,
  color = false,
}: StyleWishButtonProps) {
  const hoverFill = () => {
    if (wish) return colorPoint
    if (color) return 'none'
    return 'none'
  }
  const hoverStroke = () => {
    if (wish) return colorPoint
    if (color) return colorPoint
    return colorHexa9a9a9
  }
  const hoverBgColor = () => {
    if (wish) return colorHexf5f5f5
    if (color) return colorPoint
    return colorHexa9a9a9
  }
  return (
    (isHover || wish) && (
      <StyledStyleWishButton role="button" $width={width} $height={height}>
        <IconBook
          width={width}
          height={height}
          fill={hoverFill()}
          stroke={hoverStroke()}
          bgColor={hoverBgColor()}
          stroke1={hoverBgColor()}
        />
      </StyledStyleWishButton>
    )
  )
}
