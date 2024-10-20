import { colorPlaceholderGrey } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconCloseX({
  width = 12,
  height = 12,
  viewBox = '0 0 12 12',
  stroke = colorPlaceholderGrey,
}: SvgProps) {
  return (
    <svg
      width={width} // 14
      height={height} // 9
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.50049 2.5L9.50002 9.49953"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.49998 9.49953L9.49951 2.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
