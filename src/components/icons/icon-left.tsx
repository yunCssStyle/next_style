import { colorBlack } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconLeft({ width = 24, height = 24, stroke = colorBlack, fill = 'none' }: SvgProps) {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
