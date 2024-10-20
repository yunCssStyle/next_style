import { colorBlack } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconSearch({ width = 14, height = 14, stroke = colorBlack }: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.70809 12.2501C9.76867 12.2501 12.2498 9.76899 12.2498 6.70841C12.2498 3.64784 9.76867 1.16675 6.70809 1.16675C3.64752 1.16675 1.16643 3.64784 1.16643 6.70841C1.16643 9.76899 3.64752 12.2501 6.70809 12.2501Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8331 12.8334L11.6664 11.6667"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
