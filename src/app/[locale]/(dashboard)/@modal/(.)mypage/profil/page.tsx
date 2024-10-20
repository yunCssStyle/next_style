'use client'

import MyPageEditProfilePage from '@/app/[locale]/(dashboard)/mypage/profile/page'
import Modal from '@/components/modal/modal'

export default function MyPageProfilePage() {
  return (
    <Modal type="listBox" border="0.625rem">
      <MyPageEditProfilePage />
    </Modal>
  )
}
