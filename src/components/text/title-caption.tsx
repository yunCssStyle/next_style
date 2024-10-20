'use client'

import { styled } from 'styled-components'
import Badge from '../badge/badge'

const StyledTitleCaption = styled.div`
  position: relative;
  h1 {
    margin: 0;
    padding: 0;
    font-weight: 700;
    font-size: 2rem;
    color: var(--color-black);
  }
`

interface TitleCaptionProps {
  title: string
  badge?: string
  overFlow?: boolean
}
export default function TitleCaption({ title, badge = '', overFlow = true }: TitleCaptionProps) {
  return (
    <StyledTitleCaption className={overFlow ? `f_over_ellipsis` : ''}>
      <h1 className="f_over_ellipsis">{title}</h1>
      {badge !== '' ? <Badge anim>{badge}</Badge> : null}
    </StyledTitleCaption>
  )
}
