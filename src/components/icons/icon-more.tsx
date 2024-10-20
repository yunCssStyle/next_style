import { SvgProps } from '@/types/props/props'

export default function IconMore({ width = 24, height = 24, fill = '#8A8A8A' }: SvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4C10 2.89455 10.8945 2 12 2C13.1055 2 14 2.89455 14 4C14 5.10545 13.1055 6 12 6C10.8945 6 10 5.10545 10 4Z"
        fill={fill}
      />
      <path
        d="M10 12C10 10.8945 10.8945 10 12 10C13.1055 10 14 10.8945 14 12C14 13.1055 13.1055 14 12 14C10.8945 14 10 13.1055 10 12Z"
        fill={fill}
      />
      <path
        d="M10 20C10 18.8945 10.8945 18 12 18C13.1055 18 14 18.8945 14 20C14 21.1055 13.1055 22 12 22C10.8945 22 10 21.1055 10 20Z"
        fill={fill}
      />
    </svg>
  )
}
