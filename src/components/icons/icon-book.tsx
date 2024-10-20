import { SvgProps } from '@/types/props/props'

export default function IconBook({
  width = 32,
  height = 32,
  stroke = '#A9A9A9',
  fill = 'none',
  bgColor = 'none',
  stroke1 = 'none',
}: SvgProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 32 32" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.0001 29.3333H20.0001C26.6667 29.3333 29.3334 26.6666 29.3334 20V12C29.3334 5.33329 26.6667 2.66663 20.0001 2.66663H12.0001C5.33341 2.66663 2.66675 5.33329 2.66675 12V20C2.66675 26.6666 5.33341 29.3333 12.0001 29.3333Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.5068 20.3599V10.1066C24.5068 9.07994 23.6801 8.33329 22.6667 8.41329H22.6134C20.8268 8.55996 18.1201 9.47997 16.6001 10.4266L16.4535 10.52C16.2135 10.6666 15.8 10.6666 15.5467 10.52L15.3334 10.3866C13.8267 9.43997 11.1201 8.54661 9.33341 8.39994C8.32008 8.31994 7.49341 9.07997 7.49341 10.0933V20.3599C7.49341 21.1733 8.16006 21.9466 8.97339 22.04L9.21338 22.08C11.0534 22.32 13.9068 23.2666 15.5334 24.16L15.5734 24.1733C15.8001 24.3066 16.1734 24.3066 16.3867 24.1733C18.0134 23.2666 20.8801 22.3333 22.7334 22.08L23.0134 22.04C23.8401 21.9466 24.5068 21.1866 24.5068 20.3599Z"
          stroke={bgColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 10.7999V23.5466" stroke={stroke1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
