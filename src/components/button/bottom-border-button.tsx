'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './bottom-border-button.module.scss'
import Badge from '../badge/badge'

interface IBottomBorderButtonProps {
  title: string
  path: string
  badge: string
}

export default function BottomBorderButton({ title = '', path = '', badge = '' }: IBottomBorderButtonProps) {
  const pathname = usePathname()
  return (
    <div className={`${styles.btnContainer} ${pathname.includes(path) ? styles.active : ''}`} role="button">
      <Link href={path} prefetch>
        <div className={`f_b f_16 ${styles.btnContainerText}`}>
          <div className={styles.btnContainerTextContainer}>
            {title}
            {badge && (
              <Badge anim size="small" top="-12px" right="0" padding="0px 0.375rem">
                {badge}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
