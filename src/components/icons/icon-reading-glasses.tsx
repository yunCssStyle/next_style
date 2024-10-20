import { colorPlaceholderGrey } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconReadingGlasses({ width = 32, height = 32, stroke = colorPlaceholderGrey }: SvgProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.2666 15.6H18.9333" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.6001 18.9334V12.2667"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3334 28C22.329 28 28.0001 22.3289 28.0001 15.3333C28.0001 8.33769 22.329 2.66663 15.3334 2.66663C8.33781 2.66663 2.66675 8.33769 2.66675 15.3333C2.66675 22.3289 8.33781 28 15.3334 28Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.3334 29.3333L26.6667 26.6666"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
