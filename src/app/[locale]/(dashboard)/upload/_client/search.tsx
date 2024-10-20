'use client'

import InputSearch from '@/components/input/input-search'
import { useScopedI18n } from '@/locales/client'
import { useUploadFilterStore, setCode } from '@/stores/upload-filter'

export default function Search() {
  const prod = useScopedI18n('prod')
  // zustand 사용
  const code = useUploadFilterStore((state) => state.code)
  return (
    <div
      style={{
        maxWidth: '179px',
        width: '179px',
      }}
    >
      <InputSearch
        id="uploadCodeSearch"
        placeholder={prod('prod-no-search')}
        value={code}
        onChangeValue={(value) => setCode(value)}
      />
    </div>
  )
}
