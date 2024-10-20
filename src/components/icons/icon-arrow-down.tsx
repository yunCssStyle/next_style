import { colorBlack } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconArrowDown({ width = 9, height = 6, stroke = colorBlack }: SvgProps) {
  return (
    <svg
      width={width} // 14
      height={height} // 9
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.939758 1.23999L4.46976 4.75999L7.99976 1.23999"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
