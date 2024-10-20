'use client'

import { Suspense, useEffect } from 'react'
import { styled } from 'styled-components'
import { usePathname, useRouter } from 'next/navigation'
import IconLeft from '@/components/icons/icon-left'
import { useCurrentLocale } from '@/locales/client'

const StyledBack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  padding: 1rem;
  width: 1.5rem;
  height: 1.5rem;
`

export default function SignBack() {
  const locale = useCurrentLocale()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    router.prefetch('/signin')
  }, [router])
  return (
    <Suspense fallback={null}>
      {pathname !== `/${locale}/signin` && pathname !== `/signin` && (
        <StyledBack
          onClick={() => {
            router.replace('/signin')
          }}
        >
          <IconLeft />
        </StyledBack>
      )}
    </Suspense>
  )
}
