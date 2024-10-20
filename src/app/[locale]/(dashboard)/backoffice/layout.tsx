import Provider from '@/components/provider'
import { colorWhite } from '@/constants/theme'
import type { ReactNode } from 'react'

export default function StyleManagerLayout({
  params: { locale },
  children,
}: {
  params: { locale: string }
  children: ReactNode
}) {
  return (
    <Provider locale={locale}>
      <div
        style={{
          position: 'relative',
          boxSizing: 'border-box',
          height: '100%',
          backgroundColor: colorWhite,
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </Provider>
  )
}
