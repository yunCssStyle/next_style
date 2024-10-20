import { colorBlack } from '@/constants/theme'
import { SvgProps } from '@/types/props/props'

export default function IconExport({ width = 24, height = 24, stroke = colorBlack }: SvgProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.8333 11.1666L19.6666 4.33331"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.3333 7.66663V3.66663H16.3333"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.1667 3.66663H9.50008C5.33341 3.66663 3.66675 5.33329 3.66675 9.49996V14.5C3.66675 18.6666 5.33341 20.3333 9.50008 20.3333H14.5001C18.6667 20.3333 20.3334 18.6666 20.3334 14.5V12.8333"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
