import { colorBlack } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconFilter({ width = 12, height = 12, stroke = colorBlack }: SvgProps) {
  return (
    <svg
      width={width} // 14
      height={height} // 9
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 3.25H8" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3.25H1" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5 5C5.9665 5 6.75 4.2165 6.75 3.25C6.75 2.2835 5.9665 1.5 5 1.5C4.0335 1.5 3.25 2.2835 3.25 3.25C3.25 4.2165 4.0335 5 5 5Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 8.75H9" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8.75H1" stroke={stroke} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7 10.5C7.9665 10.5 8.75 9.7165 8.75 8.75C8.75 7.7835 7.9665 7 7 7C6.0335 7 5.25 7.7835 5.25 8.75C5.25 9.7165 6.0335 10.5 7 10.5Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
