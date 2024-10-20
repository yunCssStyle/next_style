import { colorWhite } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconCart({ width = 16, height = 16, stroke = colorWhite }: SvgProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} fill="none">
      <path
        d="M1.3335 1.3335H2.4935C3.2135 1.3335 3.78016 1.9535 3.72016 2.66683L3.16683 9.30682C3.0735 10.3935 3.93349 11.3268 5.02682 11.3268H12.1268C13.0868 11.3268 13.9268 10.5402 14.0002 9.58683L14.3602 4.58683C14.4402 3.48017 13.6002 2.58016 12.4868 2.58016H3.88017"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8336 14.6667C11.2938 14.6667 11.6669 14.2936 11.6669 13.8333C11.6669 13.3731 11.2938 13 10.8336 13C10.3733 13 10.0002 13.3731 10.0002 13.8333C10.0002 14.2936 10.3733 14.6667 10.8336 14.6667Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.50008 14.6667C5.96032 14.6667 6.33341 14.2936 6.33341 13.8333C6.33341 13.3731 5.96032 13 5.50008 13C5.03984 13 4.66675 13.3731 4.66675 13.8333C4.66675 14.2936 5.03984 14.6667 5.50008 14.6667Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.00024 5.3335H14.0002"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
