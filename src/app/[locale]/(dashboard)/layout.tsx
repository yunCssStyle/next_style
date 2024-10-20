import { SnakbarContainer } from '@/components/snackbar/snackbar-container'
import TopNav from '@/containers/layout/top-nav'
import { authOption } from '@/lib/auth'
import StyledComponentsRegistry from '@/lib/registry'
import '@/styles/globals.scss'
import { getServerSession } from 'next-auth/next'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css' // toastify css
import { Pretendard } from '../../ui/fonts'
import SessionProviderComponent from './NextAuthProvider'

export default async function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  // const session = await auth()
  const session = await getServerSession(authOption)
  return (
    <SessionProviderComponent>
      <div className={Pretendard.className}>
        <StyledComponentsRegistry>
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
              {session && <TopNav />}
              {children}
            </div>
          </div>
          {modal}
        </StyledComponentsRegistry>
        <SnakbarContainer />
      </div>
    </SessionProviderComponent>
  )
}
