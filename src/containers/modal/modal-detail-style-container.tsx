'use client'

import DetailStyleModal from '@/components/modal/detail-style-modal'
import Modal from '@/components/modal/modal'
import { useSearchParams } from 'next/navigation'

export default function ModalDetailStyleContainer() {
  const params = useSearchParams()
  return (
    params &&
    params.get('detailStyle') && (
      <Modal type="listBox">
        <DetailStyleModal getData={params.get('detailStyle')} />
      </Modal>
    )
  )
}
