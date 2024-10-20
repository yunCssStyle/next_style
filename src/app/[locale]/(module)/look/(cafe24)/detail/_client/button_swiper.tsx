'use client'

import Button from '@/components/button/button'
import ICON from '@/svg'

interface ButtonSwiperProps {
  type: string
  smBtnDisabled: string
  swiperItemClick: (type: string) => void
}

export default function ButtonSwiper({ type, swiperItemClick, smBtnDisabled }: ButtonSwiperProps) {
  return (
    <span
      className={`sm_${type} ${smBtnDisabled === type ? 'sm_disabled' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => swiperItemClick(type)}
      onKeyDown={() => swiperItemClick(type)}
      aria-label="detail page"
    >
      <Button theme="none" size="smallF" paddingLR="0px">
        <ICON.LookLeft />
      </Button>
    </span>
  )
}
