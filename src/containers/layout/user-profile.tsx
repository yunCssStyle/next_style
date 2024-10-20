'use client'

import { UserProfileSkeleton } from '@/app/ui/skeleton'
import { useScopedI18n } from '@/locales/client'
import interceptorClient from '@/services/mutator/interceptorClient'
import { addUserInfo, useUserInfoStore } from '@/stores/user-info'
import { useEffect } from 'react'
import styles from './style.module.scss'
import UserProfileAvatar from './user-profile-avatar'

export default function UserProfile() {
  const topMenuName = useScopedI18n('top.menu')
  const nickName = useUserInfoStore((state) => state.nickName)

  const userCallback = async () => {
    try {
      const user = await interceptorClient.get('/users/me')
      addUserInfo(user.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    if (nickName === null) {
      userCallback()
    }
  }, [nickName])

  if (nickName === null) return <UserProfileSkeleton />
  return (
    <div className={styles.topNavUser}>
      <div
        className={styles.topNavUserAcc}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `&#128075; ${topMenuName('hello', { name: nickName ? nickName : 'Guest' })}`,
        }}
      />
      {<UserProfileAvatar />}
    </div>
  )
}
