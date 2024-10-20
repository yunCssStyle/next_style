import Provider from '@/components/provider'
import StyledComponentsRegistry from '@/lib/registry'
import '@/styles/globals.scss'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'StyleLook',
  description: 'stylebot',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Provider locale={locale}>{children}</Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
