'use client'

import { ITopMenu, topMenu } from '@/constants/menu'
import BottomBorderButton from '@/components/button/bottom-border-button'
import MainLogo from '@/components/logo/main-logo'
import { useScopedI18n } from '@/locales/client'
import { usePathname } from 'next/navigation'
import UserProfile from './user-profile'
import styles from './style.module.scss'

export default function TopNav() {
  const pathname = usePathname()
  const topMenuName = useScopedI18n('top.menu')
  if (!pathname.includes('look') && !pathname.includes('notfound') && !pathname.includes('backoffice')) {
    return (
      <nav className={styles.topNav}>
        <div className={styles.topNavContainer}>
          <div className={styles.topNavSpaceContainer}>
            <div className={styles.topNavLogo}>
              <MainLogo />
              <div className={styles.topNavMenu}>
                {topMenu.map((menu: ITopMenu) => {
                  return (
                    <BottomBorderButton
                      key={menu.name}
                      title={topMenuName(menu.name as any)}
                      path={menu.path}
                      badge={menu.badge}
                    />
                  )
                })}
              </div>
            </div>
            {/*  */}
            <UserProfile />
          </div>
        </div>
      </nav>
    )
  }
  return null
}
