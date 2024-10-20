'use client'

import MyPageEditPasswordPage from '@/app/[locale]/(dashboard)/mypage/password/page'
import Modal from '@/components/modal/modal'

export default function MyPagePasswordPage() {
  return (
    <Modal type="popup">
      <MyPageEditPasswordPage />
    </Modal>
  )
}
