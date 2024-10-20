'use client'

import Link from 'next/dist/client/link'
import { styled } from 'styled-components'
import ICON from '@/svg'

const StyledMainLogo = styled.div<{ $type: string }>`
  display: flex;
  align-items: center;
  height: 100%;
  flex-grow: 0;
  min-width: 0px;
  svg {
    path {
      ${(props) =>
        props.$type === 'main' &&
        `
        fill: var(--color-point);
      `}
    }
  }
`

export default function MainLogo({ type = 'main' }: { type?: string }) {
  return (
    <Link href="/">
      <StyledMainLogo $type={type}>
        {type == 'main' ? <ICON.StyleLookLogo width="130px" /> : <ICON.styleLookLoginLogo width="290px" />}
      </StyledMainLogo>
    </Link>
  )
}
