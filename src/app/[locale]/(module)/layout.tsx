import { LookProvider } from '@/contexts/look-context'
import StyledComponentsRegistry from '@/lib/registry'
import '@/styles/globals.scss'
import { headers } from 'next/headers'
import React from 'react'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  return (
    <StyledComponentsRegistry>
      <LookProvider ip={ip}>
        <div
          style={{
            height: '100%',
            WebkitFontSmoothing: 'auto',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          <div
            className="root-layout"
            style={{
              width: '100vw',
              height: '100vh',
              position: 'relative',
            }}
          >
            {children}
          </div>
        </div>
      </LookProvider>
    </StyledComponentsRegistry>
  )
}
