'use client'

import { useRouter } from 'next/navigation'
import IconLeft from '../icons/icon-left'
import Button from './button'

export default function BackKey() {
  const router = useRouter()
  return (
    <Button paddingLR="0.5rem" theme="none" onClick={() => router.back()}>
      <IconLeft width={24} height={24} />
    </Button>
  )
}
