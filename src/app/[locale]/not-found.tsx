'use client'

import { styled } from 'styled-components'
import Image from 'next/image'
import Button from '@/components/button/button'
import Link from 'next/link'
import { useCurrentLocale, useScopedI18n } from '@/locales/client'
import Provider from '@/components/provider'

const StyledNotFound = styled.div`
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
    z-index: var(--notfound-main-container-level);
    position: relative;
  }
`
export default function NotFoundPage() {
  const notfound = useScopedI18n('notfound')
  const locale = useCurrentLocale()
  return (
    <Provider locale={locale}>
      <StyledNotFound>
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
          <h1 className="c_black f_38 f_bold">{notfound('title')}</h1>
          <p
            className="c_black f_18"
            style={{
              marginBottom: '2.5rem',
            }}
          >
            {notfound('go-home-again')}
          </p>
          <Link href="/">
            <Button size="medium" theme="primary" borderRadius="3px">
              {notfound('go-home')}
            </Button>
          </Link>
        </div>
      </StyledNotFound>
    </Provider>
  )
}
