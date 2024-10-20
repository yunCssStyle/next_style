'use client'

import Button from '@/components/button/button'
import { useScopedI18n } from '@/locales/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AddProductButton() {
  const prod = useScopedI18n('prod')
  const pathname = usePathname()
  return (
    <Link href={`${pathname}?addProd=true`}>
      <Button paddingLR="1.5rem">{prod('add-prod')}</Button>
    </Link>
  )
}
