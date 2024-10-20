import { colorPlaceholderGrey } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconCaratLeft({
  width = 24,
  height = 24,
  fill = colorPlaceholderGrey,
  transform = 'rotate(0)',
}: SvgProps) {
  return (
    <svg
      width={width} // 14
      height={height} // 9
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      transform={transform}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.16 7.41L10.58 12L15.16 16.59L13.75 18L7.75 12L13.75 6L15.16 7.41Z" fill={fill} />
    </svg>
  )
}
