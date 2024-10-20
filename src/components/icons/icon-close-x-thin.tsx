import { colorBlack } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconCloseXThin({ width = 24, height = 24, stroke = colorBlack }: SvgProps) {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_3322_365)">
        <path
          d="M1.00156 1L23.0002 22.9986"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.999944 22.9985L22.9986 0.999878"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3322_365">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
