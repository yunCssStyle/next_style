'use client'

import Button from '@/components/button/button'
import Image from 'next/image'
import Link from 'next/link'
import { useUserInfoStore } from '@/stores/user-info'
import { useScopedI18n } from '@/locales/client'
import styles from '@/components/modal/modal.module.scss'

export default function MyPage() {
  const { email, nickName, profile: profile } = useUserInfoStore()
  const mypage = useScopedI18n('mypage')
  return (
    <div className={`${styles.modal_grid} ${styles.mypage}`}>
      <div className={styles.grid_header}>
        <p className="f_18 f_bold">{mypage('title')}</p>
      </div>
      <div className={`${styles.grid_list} ${styles.list_box}`}>
        {/* 프로필 */}
        <div
          style={{
            paddingBottom: '1.125rem',
          }}
        >
          <p className={styles.label}>{mypage('profil-setting')}</p>
        </div>
        {/* 이미지 */}
        <div className={styles.image_box}>
          <div className={styles.image}>
            <Image
              src={profile || '/images/avatar/3.png'}
              alt="Avatar"
              sizes="112px"
              fill
              priority
              quality={85}
              style={{ objectFit: 'contain', borderRadius: '112px' }}
            />
          </div>
          <div className={styles.edit_profil}>
            <Link href="/mypage/profil" scroll={false}>
              <Button size="small" theme="mypage" borderRadius="3px">
                {mypage('edit')}
              </Button>
            </Link>
          </div>
        </div>
        {/* 이메일 */}
        <div>
          <p className={styles.label}>{mypage('email')}</p>
        </div>
        <div>
          <p
            className={`${styles.values} f_over_ellipsis`}
            style={{
              paddingTop: '1.125rem',
              paddingBottom: '1.5rem',
            }}
          >
            {email || ''}
          </p>
        </div>
        {/* 닉네임 */}
        <div
          style={{
            paddingBottom: '0.625rem',
          }}
        >
          <p className={styles.label}>{mypage('nickName')}</p>
        </div>
        <div className="modal_row flex_center">
          <p className={`${styles.values} ${styles.row_text} f_over_ellipsis d_block`}>{nickName || ''}</p>
          <Link href="/mypage/nickname" scroll={false}>
            <Button size="small" theme="mypage" borderRadius="3px">
              {mypage('nickName-title')}
            </Button>
          </Link>
        </div>
        {/* 비밀번호 */}
        <div
          style={{
            paddingTop: '1.5rem',
            paddingBottom: '1.125rem',
          }}
        >
          <p className={styles.label}>{mypage('password')}</p>
        </div>
        <Link href="/mypage/password" scroll={false}>
          <Button size="small" theme="mypage" borderRadius="3px">
            {mypage('password-title')}
          </Button>
        </Link>
        <div
          style={{
            paddingTop: '1.5rem',
            paddingBottom: '1rem',
          }}
        >
          <p className={styles.label}>{mypage('account')}</p>
        </div>
        <Link href="/mypage/withdraw" scroll={false}>
          <Button size="small" theme="delete" borderRadius="3px">
            {mypage('delete-account')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
