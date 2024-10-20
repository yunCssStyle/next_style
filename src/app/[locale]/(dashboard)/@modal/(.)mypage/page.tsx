'use client'

import Modal from '@/components/modal/modal'
import MyPage from '../../mypage/page'

export default function MyPageModal() {
  return (
    <Modal type="listBox" border="0.625rem">
      <MyPage />
    </Modal>
  )
}
