import { colorPoint } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconFillArrowDown({ width = 14, height = 9, fill = colorPoint }: SvgProps) {
  return (
    <svg
      width={width} // 14
      height={height} // 9
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.6983 8.19259C7.30182 8.62631 6.61861 8.62631 6.22213 8.19259L0.263888 1.67471C-0.32274 1.03298 0.13252 -7.60099e-08 1.00197 0L12.9185 1.04177e-06C13.7879 1.11778e-06 14.2432 1.03298 13.6565 1.67471L7.6983 8.19259Z"
        fill={fill}
      />
    </svg>
  )
}
