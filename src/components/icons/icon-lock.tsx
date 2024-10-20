import { SvgProps } from '@/types/props/props'

export default function IconLock({ width = 24, height = 24, stroke = '#8A8A8A' }: SvgProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.0769 9.75H19.5769C19.5769 9.75 21.0769 9.75 21.0769 11.25V21.75C21.0769 21.75 21.0769 23.25 19.5769 23.25H6.0769C6.0769 23.25 4.5769 23.25 4.5769 21.75V11.25C4.5769 11.25 4.5769 9.75 6.0769 9.75Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5769 9.75V6C7.5769 4.60761 8.13003 3.27226 9.11459 2.28769C10.0992 1.30312 11.4345 0.75 12.8269 0.75C14.2193 0.75 15.5546 1.30312 16.5392 2.28769C17.5238 3.27226 18.0769 4.60761 18.0769 6V9.75"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12.8269 15V18" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
