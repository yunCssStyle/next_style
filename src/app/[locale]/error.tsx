'use client'

import { styled } from 'styled-components'
import Image from 'next/image'
import Button from '@/components/button/button'
import Link from 'next/link'
import { useI18n, useCurrentLocale, useScopedI18n } from '@/locales/client'
import Provider from '@/components/provider'

const StyledError = styled.div`
  width: 100%;
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  position: relative;
  .footer {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: var(--error-main-container-level);
    position: relative;
  }
`
export default function NotFoundPage() {
  const t = useI18n()
  const errorPage = useScopedI18n('error')
  const locale = useCurrentLocale()
  return (
    <Provider locale={locale}>
      <StyledError>
        <div className="footer c_place f_10">@2024 STYLEBOT ALL Right Reserved.</div>
        <div className="inner">
          <div style={{ width: '100px', height: '100px', position: 'relative' }}>
            <Image
              src="/images/avatar/guide.png"
              alt="Avatar"
              sizes="100px"
              fill
              priority
              quality={85}
              style={{ objectFit: 'cover', borderRadius: '100px' }}
            />
          </div>
          <h1 className="c_black f_38 f_bold">{errorPage('title')}</h1>
          <p
            className="c_black f_18"
            style={{
              marginBottom: '2.5rem',
            }}
          >
            {errorPage('connecting-again')}
          </p>
          <Link href="/">
            <Button size="medium" theme="primary" borderRadius="3px">
              {t('notfound.go-home')}
            </Button>
          </Link>
        </div>
      </StyledError>
    </Provider>
  )
}
