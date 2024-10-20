import { Pretendard } from '@/app/ui/fonts'
import type { ReactNode } from 'react'

export default function StyleManagerLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={Pretendard.className}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        height: '100%',
      }}
    >
      {children}
    </div>
  )
}
