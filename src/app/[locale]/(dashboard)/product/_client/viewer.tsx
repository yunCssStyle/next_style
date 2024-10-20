'use client'

import Button from '@/components/button/button'
import VerticalLine from '@/components/ui/vertical-line'
import { useScopedI18n } from '@/locales/client'
import { ProductStatusBulkDtoStatus } from '@/services/generated/managerstore.schemas'
import { useProductFilterStore, setViewType } from '@/stores/product-filter'

export default function View({ handleActive }: { handleActive: (active: ProductStatusBulkDtoStatus) => void }) {
  // zustand 사용
  const viewType = useProductFilterStore((state) => state.viewType)
  const activeFun = useProductFilterStore((state) => state.activeFun)
  const prod = useScopedI18n('prod')
  return (
    <>
      <Button
        paddingLR="0.5rem"
        borderRadius="0.1875rem"
        size="small"
        theme={viewType === 'simply' ? 'primary' : 'secondary'}
        onClick={() => {
          setViewType('simply')
        }}
      >
        {prod('viewer-simply')}
      </Button>
      <Button
        paddingLR="0.5rem"
        borderRadius="0.1875rem"
        size="small"
        theme={viewType === 'detail' ? 'primary' : 'secondary'}
        onClick={() => {
          setViewType('detail')
        }}
      >
        {prod('viewer-detail')}
      </Button>
      {/* 활성화 비활성화 버튼 */}
      {viewType === 'detail' && (
        <>
          <VerticalLine />
          <Button
            borderRadius="0.1875rem"
            paddingLR="0.5rem"
            size="small"
            theme={!activeFun ? 'secondary' : 'primary'}
            disabled={!activeFun}
            onClick={() => handleActive(ProductStatusBulkDtoStatus.ACTIVE)}
          >
            {prod('viewer-active')}
          </Button>
          <Button
            borderRadius="0.1875rem"
            paddingLR="0.5rem"
            size="small"
            theme={!activeFun ? 'secondary' : 'primary'}
            disabled={!activeFun}
            onClick={() => handleActive(ProductStatusBulkDtoStatus.INACTIVE)}
          >
            {prod('viewer-non-active')}
          </Button>
        </>
      )}
    </>
  )
}
