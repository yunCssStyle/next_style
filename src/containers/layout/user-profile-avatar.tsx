'use client'

import Image from 'next/image'
import SelectBox from '@/components/select/select-box'
import { useRouter } from 'next/navigation'
import { logOut, useUserInfoStore } from '@/stores/user-info'
import { useScopedI18n } from '@/locales/client'
import IconFillArrowDown from '@/components/icons/icon-fill-arrow-down'
import styles from './style.module.scss'

export default function UserProfileAvatar() {
  const profile = useUserInfoStore((state) => state.profile)
  const router = useRouter()
  const menuName = useScopedI18n('menu')

  return (
    <SelectBox
      width="120px"
      position="fixed"
      top="68px"
      datas={[
        { code: 'mypage', name: menuName('mypage') },
        { code: 'logout', name: menuName('logout') },
      ]}
      onClickOptionValue={async (_data: string) => {
        if (_data === 'mypage') {
          router.push('/mypage', { scroll: false })
        } else if (_data === 'logout') {
          logOut()
        }
      }}
    >
      <div className={styles.topNavUserAva}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarContainer}>
            <Image
              src={profile}
              alt="Avatar"
              sizes="85px"
              width={85}
              height={40}
              priority
              style={{ objectFit: 'cover' }}
              quality={80}
            />
          </div>
        </div>
        <div>
          <IconFillArrowDown />
        </div>
      </div>
    </SelectBox>
  )
}
