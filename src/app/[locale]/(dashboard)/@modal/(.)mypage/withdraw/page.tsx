'use client'

import MyPageWithDrawPage from '@/app/[locale]/(dashboard)/mypage/withdraw/page'
import Modal from '@/components/modal/modal'

export default function MyPageWithDraw() {
  return (
    <Modal type="popup">
      <MyPageWithDrawPage />
    </Modal>
  )
}
