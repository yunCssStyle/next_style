import { colorWhite } from '@/constants/theme'
import type { ReactNode } from 'react'

export default function StyleManagerLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        height: '100%',
        backgroundColor: colorWhite,
      }}
      className="olivela"
    >
      {children}
    </div>
  )
}
