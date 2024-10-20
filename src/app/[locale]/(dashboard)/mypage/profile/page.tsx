'use client'

import Image from 'next/image'
import Button from '@/components/button/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import userAvatarData from '@/constants/user'
import { colorTransparent } from '@/constants/theme'
import { showSnakbar } from '@/utils/utils'
import { useI18n } from '@/locales/client'
import interceptorClient from '@/services/mutator/interceptorClient'
import { setProfile, useUserInfoStore } from '@/stores/user-info'
import styles from '@/components/modal/modal.module.scss'

export default function MyPageEditProfilePage() {
  const [stateProfile, setStateProfile] = useState(useUserInfoStore.getState().profile)
  const router = useRouter()
  const t = useI18n()

  const handleClickSave = async () => {
    try {
      const profile = await interceptorClient.put('/users/me', {
        profileImageUrl: stateProfile,
      })
      setProfile(profile.data.profileImageUrl)
      router.back()
      showSnakbar('', t('snackbar.succEditProfil'), stateProfile)
    } catch (error: any) {
      showSnakbar('', error.message, stateProfile)
    }
  }

  return (
    <div className={`${styles.modal_grid} ${styles.mypage}`}>
      <div className={styles.grid_header}>
        <p className="f_18 f_bold">{t('mypage.profil-setting')}</p>
      </div>
      <div className={`${styles.grid_main} ${styles.image_list_box}`}>
        <div className={styles.gird}>
          {/* 프로필 */}
          {userAvatarData.length > 0 &&
            userAvatarData.map((item) => {
              return (
                <div
                  key={item.path}
                  style={{
                    width: '72px',
                    height: '72px',
                    position: 'relative',
                    cursor: 'pointer',
                    opacity: stateProfile === item.path ? 1 : 0.2,
                    border: `1px solid ${stateProfile === item.path ? 'var(--color-point)' : colorTransparent}`,
                    borderRadius: '72px',
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setStateProfile(item.path)}
                  onKeyDown={() => setStateProfile(item.path)}
                >
                  <Image
                    src={item.path}
                    alt="Avatar"
                    sizes="72px"
                    fill
                    priority
                    quality={85}
                    style={{ objectFit: 'contain', borderRadius: '112px' }}
                  />
                </div>
              )
            })}
        </div>
        <div
          className={styles.grid_bottom}
          style={{
            border: 'none',
          }}
        >
          <div
            className="flex_row"
            style={{
              justifyContent: 'end',
              width: '100%',
              gap: '0.5rem',
            }}
          >
            <div>
              <Button size="small" theme="mypage" onClick={() => router.back()}>
                {t('common.cancle')}
              </Button>
            </div>
            <div>
              <Button size="small" theme="primary" onClick={handleClickSave}>
                {t('common.ok')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
