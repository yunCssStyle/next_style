'use client'

import MyPageEditNickNamePage from '@/app/[locale]/(dashboard)/mypage/nickname/page'
import Modal from '@/components/modal/modal'

export default function MyPageNickNamePage() {
  return (
    <Modal type="popup">
      <MyPageEditNickNamePage />
    </Modal>
  )
}
